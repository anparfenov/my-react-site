import {
  GithubProject,
  GithubRepo,
  Project,
  RepoName,
  RepoStructure,
  Tech,
} from './projects.types';
import { projectsMeta } from '#lib/data/projects';

function isGithubRepoAndProject(
  repo: GithubProject | unknown
): repo is GithubProject {
  return (repo as GithubRepo).stargazers_count !== undefined;
}

// TODO: type
function createTech(languages: any): Array<Tech> {
  if (!languages) {
    return [];
  }
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
    link: projectsMeta?.[repo.name]?.link ?? '',
    image: projectsMeta?.[repo.name]?.image ?? {},

    repo: {
      link: repo.html_url,
      name: RepoName.GITHUB,
    },
  };
}

export function adaptToRepoStructure(
  repos: Array<GithubProject> | null
): Array<RepoStructure> {
  if (repos) {
    return repos
      .filter((repo) => projectsMeta[repo.name])
      .map((repo) => {
        if (isGithubRepoAndProject(repo)) {
          return adaptGithubRepo(repo);
        }
        return repo;
      });
  }
  return [];
}
