import { TranslationObject } from '../../global';

export const aboutI18N: TranslationObject = {
  ru: {
    seo: {
      title: 'Обо мне | Андрей Парфенов ',
      description: 'Обо мне',
    },
    title: 'Обо мне',
    cv: 'резюме',
    spec: 'спецификация',
    hertz: 'Ггц',
    gb: 'ГБ',
    sources: 'исходники',
    mylaptop: 'мой ноутбук',
    myphone: 'мой смартфон',
    telegramDescription: 'тележка',
    vkDescription: 'вк',
    githubDescription:
      'тут лежат мои основные репы: этот сайт, проекты из секции "проекты", разные либы, стартеры',
    gitlabDescription:
      'тут все остальное: в основном тестовые задания и всякие тестовые проекты',
    dotfilesDescription: '<- можно тыкнуть',
    sourcesDescription: '<- тоже можно тыкнуть',
  },
};

export type UserLink = {
  icon?: string;
  url: string;
  text?: string;
  label?: string;
  textLang?: string;
  isActive?: boolean;
};

export type TMyDevice = {
  name: string;
  link: string;
  labelLang: string;
  image?: string;
};

export type LinkWithDescription = { link: UserLink; descriptionLang: string };

export type AboutData = Readonly<{
  links: LinkWithDescription[];
  devices: TMyDevice[];
}>;

export const aboutData: AboutData = {
  links: [
    {
      link: {
        icon: 'brand-telegram',
        label: 'telegram',
        url: 'https://t.me/rawkangaroo',
      },
      descriptionLang: 'about.telegramDescription',
    },
    {
      link: {
        icon: 'brand-vk',
        label: 'vk',
        url: 'https://vk.com/andrey.parfenov',
      },
      descriptionLang: 'about.vkDescription',
    },
    {
      link: {
        icon: 'brand-github',
        label: 'github',
        url: 'https://github.com/moody-person',
      },
      descriptionLang: 'about.githubDescription',
    },
    {
      link: {
        icon: 'brand-gitlab',
        label: 'gitlab',
        url: 'https://gitlab.com/asleeppiano',
      },
      descriptionLang: 'about.gitlabDescription',
    },
    {
      link: {
        text: 'dotfiles',
        url: 'https://github.com/moody-person/dotfiles',
      },
      descriptionLang: 'about.dotfilesDescription',
    },
    {
      link: {
        textLang: 'about.sources',
        url: 'https://github.com/moody-person/my-react-site',
      },
      descriptionLang: 'about.sourcesDescription',
    },
  ],
  devices: [
    {
      image: '/images/devices/macbook_pro_14.webp',
      name: 'macbook pro 14 (2021)',
      labelLang: 'about.mylaptop',
      link: 'https://www.apple.com/shop/buy-iphone/iphone-13',
    },
    {
      image: '/images/devices/iphone_13.webp',
      name: 'iPhone 13',
      labelLang: 'about.myphone',
      link: 'https://www.apple.com/shop/buy-mac/macbook-pro/14-inch',
    },
  ],
};
