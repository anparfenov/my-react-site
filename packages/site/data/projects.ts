import { Project } from "@features/projects/projects.types";

export const projectsI18N = {
    ru: {
        seo: {
            title: 'Мои проекты | Андрей Парфенов ',
            descritpion: 'Мои проекты',
        },
        title: 'Мои проекты',
    }
}

export const projectsList: Project[] = [
    {
        name: 'origin-hugo-theme',
        host: 'github',
        link: 'https://asleeppiano.gitlab.io/origin-hugo-site',
        image: {
            src: '/images/projects/origin-hugo-theme.png',
            width: 300,
            height: 300,
            alt: 'origin hugo',
        },
    },
    {
        name: '11ty-starter',
        host: 'github',
        link: 'https://moody-person.github.io/11ty-starter',
        image: {
            src: '/images/projects/11ty-starter.png',
            width: 300,
            height: 300,
            alt: '11ty starter',
        },
    },
    {
        name: 'http-client',
        host: 'github',
        link: 'https://www.npmjs.com/package/@asleeppiano/http-client',
        image: {
            src: '/images/projects/http-client.png',
            width: 300,
            height: 300,
            alt: 'http client image',
        },
    },
];
