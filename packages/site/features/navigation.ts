import { useRouter } from "next/router";

export type Nav = {
    nameLang: string;
    url: string;
    isCurrent: boolean;
}

// Sync routes with pages file names
const routes = [
    {
        nameLang: 'nav.home',
        url: '/',
        isCurrent: false,
    },
    {
        nameLang: 'nav.about',
        url: '/about',
        isCurrent: false,
    },
    {
        nameLang: 'nav.articles',
        url: '/articles',
        isCurrent: false,
    },
    {
        nameLang: 'nav.cv',
        url: '/cv',
        isCurrent: false,
    },
    {
        nameLang: 'nav.projects',
        url: '/projects',
        isCurrent: false,
    },
];

function updateIsCurrent(routes: Nav[], currentPath: string) {
    return routes.map((route) => {
        if (route.url === currentPath) {
            route.isCurrent = true;
        } else {
            route.isCurrent = false;
        }
        return route;
    })
}

export function useMyRouter() {
    const { pathname } = useRouter();

    return {
        navList: updateIsCurrent(routes, pathname),
    }
}