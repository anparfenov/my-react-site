'use client';
import { usePathname } from 'next/navigation';

export type Nav = {
  nameLang: string;
  url: string;
  isCurrent: boolean;
};

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
    route.isCurrent = route.url === currentPath;
    return route;
  });
}

export function useMyRouter() {
  const pathname = usePathname();

  return {
    navList: updateIsCurrent(routes, pathname),
  };
}
