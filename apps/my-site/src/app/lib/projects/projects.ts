// Use exports from this module only in server-side functions (getStaticProps, getServerSideProps)
import { HttpRequestBuilder, isOk } from '@asleeppiano/http-client';
import fs from 'fs';
import path from 'path';
import { projectsList } from '#lib/data/projects';
import { githubApiClient, GITHUB_API_URL } from './api';
import {
  GithubProject,
  GithubRepo,
  Project,
  RepoName,
  RepoStructure,
  Tech,
} from './projects.types';

function isGithubRepoAndProject(
  repo: GithubProject | unknown
): repo is GithubProject {
  return (repo as GithubRepo).stargazers_count !== undefined;
}

function notNull<T>(val: T | null): val is T {
  return val !== null;
}

function createTech(languages: any): Array<Tech> {
  return Object.keys(languages).map((lang) => ({
    name: lang.toLowerCase(),
  }));
}

function adaptGithubRepo(repo: GithubRepo & Project) {
  return {
    id: repo.id,
    title: repo.name,
    techList: createTech(repo.languages),
    description: repo.description,
    forks: repo.forks,
    stars: repo.stargazers_count,
    link: repo.link,
    image: repo.image,

    repo: {
      link: repo.html_url,
      name: RepoName.GITHUB,
    },
  };
}

function adaptToRepoStructure(
  repos: Array<GithubProject> | null
): Array<RepoStructure> {
  if (repos) {
    return repos.map((repo) => {
      if (isGithubRepoAndProject(repo)) {
        return adaptGithubRepo(repo);
      }
      return repo;
    });
  }
  return [];
}

export async function fetchGithubProjects(): Promise<Array<RepoStructure>> {
  const request = new HttpRequestBuilder()
    .url(`${GITHUB_API_URL}/users/moody-person/repos`)
    .headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // https://stackoverflow.com/questions/39907742/github-api-is-responding-with-a-403-when-using-requests-request-function
      'User-Agent': 'next.js application',
    })
    .get()
    .build();
  const repos = await githubApiClient.send<GithubRepo[]>(request);

  if (isOk(repos)) {
    const filteredRepos: Array<GithubProject> = repos.result.data
      .filter((repo) =>
        projectsList.some(
          (project) => repo.name === project.name && project.host === 'github'
        )
      )
      .map((repo) => {
        const currProject = projectsList.find(
          (project) => project.name === repo.name && project.host === 'github'
        );
        if (currProject) {
          return { ...repo, ...currProject };
        }
        return null;
      })
      .filter(notNull);

    const langPromises = [];
    for (const repo of filteredRepos) {
      const langRequest = new HttpRequestBuilder()
        .url(repo.languages_url)
        .get()
        .build();
      const langPromise = githubApiClient.send<string[]>(langRequest);
      langPromises.push(langPromise);
    }

    const languages = await Promise.all(langPromises);
    const langs = languages.map((l) => (isOk(l) ? l.result.data : []));
    const res = filteredRepos.map((repo, i) => ({
      ...repo,
      languages: langs[i],
    }));
    return adaptToRepoStructure(res);
  }

  return [];
}

function parseDuration(duration: string): number {
  let num = '';
  let time = '';
  duration.split('').forEach((char) => {
    if (!Number.isNaN(Number(char))) {
      num += char;
    } else {
      time = char;
    }
  });

  if (time === 'h') {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + Number(num));
    return endTime.getTime();
  } else if (time === 'w') {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + Number(num) * 7);
    return endTime.getTime();
  }
  return 0;
}

const cacheDir = path.resolve(__dirname, '../_cache');
const cacheDest = path.resolve(cacheDir, 'projects.json');

export async function getProjectsData(): Promise<Array<RepoStructure> | null> {
  try {
    if (fs.existsSync(cacheDest)) {
      const file = fs.readFileSync(cacheDest, 'utf-8');
      const cachedProjects = JSON.parse(file);
      const cacheEndDate = Number(cachedProjects.endDate);
      if (cacheEndDate > Date.now()) {
        return cachedProjects.projects;
      }
    } else if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }
    const githubProjects = await fetchGithubProjects();
    if (githubProjects.length > 0) {
      const cachedProject = {
        projects: githubProjects,
        endDate: parseDuration('1w'),
      };
      fs.writeFileSync(cacheDest, JSON.stringify(cachedProject));
      return githubProjects;
    }
    return null;
  } catch (e) {
    console.error('Cannot get projects: ', e);
    return null;
  }
}
