import { MainLayout } from '#uikit/layouts/MainLayout/MainLayout';
import { TextWithBack } from '#uikit/components/TextWithBack/TextWithBack';
import { i18n } from '#lib/i18n/i18n';
import { getProjectsData } from '#lib/projects/projects';
import { ProjectsList } from '#widgets/projects/ProjectsList/ProjectsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: i18n.t('projects.seo.title'),
  description: i18n.t('projects.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

// TODO: fix github request
export default async function Projects() {
  const projects = await getProjectsData();
  return (
    <MainLayout>
      <TextWithBack>{i18n.t('projects.title')}</TextWithBack>
      {projects && <ProjectsList projects={projects} />}
      {!projects && <div>no projects :(</div>}
    </MainLayout>
  );
}
