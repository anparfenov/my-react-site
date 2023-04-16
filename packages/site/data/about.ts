export const aboutI18N = {
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

export type AboutData = {
    links: UserLink[];
    devices: TMyDevice[];
};

export const aboutData = {
    links: [
        {
            icon: 'brand-telegram',
            label: 'telegram',
            url: 'https://t.me/rawkangaroo',
        },
        {
            icon: 'brand-vk',
            label: 'vk',
            url: 'https://vk.com/andrey.parfenov',
        },
        {
            icon: 'brand-github',
            label: 'github',
            url: 'https://github.com/moody-person',
        },
        {
            icon: 'brand-gitlab',
            label: 'gitlab',
            url: 'https://gitlab.com/asleeppiano',
        },
        {
            text: 'dotfiles',
            url: 'https://github.com/moody-person/dotfiles',
        },
        {
            textLang: 'about.sources',
            url: 'https://github.com/moody-person/my-react-site',
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
