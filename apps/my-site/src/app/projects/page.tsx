import { MainLayout } from '#uikit/layouts/MainLayout/MainLayout';
import { TextWithBack } from '#uikit/components/TextWithBack/TextWithBack';
import { i18n } from '#lib/i18n/i18n';
import { ProjectsList } from '#widgets/projects/ProjectsList/ProjectsList';
import { GITHUB_API_URL } from '#lib/projects/api';
import { Metadata } from 'next';
import { adaptToRepoStructure } from '#lib/projects/projects';

export const metadata: Metadata = {
  title: i18n.t('projects.seo.title'),
  description: i18n.t('projects.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

async function getGithubProjects() {
  const data = await fetch(`${GITHUB_API_URL}/users/anparfenov/repos`, {
    cache: 'force-cache',
  });
  const json = await data.json();

  return adaptToRepoStructure(json);
}

// TODO: fix github request
export default async function Projects() {
  const projects = await getGithubProjects();

  console.log('projects', projects);
  return (
    <MainLayout>
      <TextWithBack>{i18n.t('projects.title')}</TextWithBack>
      {projects && <ProjectsList projects={projects} />}
      {!projects && <div>no projects :(</div>}
    </MainLayout>
  );
}
