import Head from 'next/head';
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import { TextWithBack } from 'components/TextWithBack/TextWithBack';
import { i18n } from 'i18n/i18n';
import { getProjectsData } from 'features/projects';
import { ProjectsList } from 'components/ProjectsList/ProjectsList';
import { RepoStructure } from 'features/projects.types';

type ProjectsProps = {
    projects: RepoStructure[],
}

export async function getStaticProps() {
    const repos = await getProjectsData();
    return {
        props: {
            projects: repos,
        }
    }
}

// TODO: add router loading
export default function Projects({ projects }: ProjectsProps) {
    return (
        <MainLayout>
            <Head>
                <title>{i18n.t('projects.seo.title')}</title>
                <meta
                    name="description"
                    content={i18n.t('projects.seo.description')}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TextWithBack>{i18n.t('projects.title')}</TextWithBack>
            {projects && <ProjectsList projects={projects} />}
        </MainLayout>
    );
}
