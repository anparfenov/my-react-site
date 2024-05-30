import rosetta from 'rosetta';
import { aboutI18N } from '../data/about';
import { adminI18N } from '../data/admin';
import { cvI18N } from '../data/cv';
import { footerI18N } from '../data/footer';
import { homeI18N } from '../data/home';
import { navI18N } from '../data/nav';
import { projectsI18N } from '../data/projects';
import { articlesI18N } from '../data/articles';

export const i18n = rosetta({
  ru: {
    admin: {
      ...adminI18N['ru'],
    },
    nav: {
      ...navI18N['ru'],
    },
    home: {
      ...homeI18N['ru'],
    },
    about: {
      ...aboutI18N['ru'],
    },
    articles: {
      ...articlesI18N['ru'],
    },
    cv: {
      ...cvI18N['ru'],
    },
    projects: {
      ...projectsI18N['ru'],
    },
    footer: {
      ...footerI18N['ru'],
    },
  },
});

i18n.locale('ru');
