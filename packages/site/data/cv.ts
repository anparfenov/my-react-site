import { UserLink } from "./about";

export const cvI18N = {
    ru: {
        seo: {
            title: 'Резюме | Андрей Парфенов',
            description: 'Резюме',
        },
        name: 'Андрей Парфенов',
        profession: 'Разработчик интерфейсов',
        programmingLanguages: 'Языки программирования',
        frameworks: 'Фреймворки',
        restSection: 'Остальное',
        usingAtCurrentJob: 'использую на текущей работе',
        skills: 'Навыки',
        jobExperience: 'Опыт работы',
        education: 'Образование',
        currentTime: 'текущее время',
        noResume: 'Резюме нет',
        jobVK: {
            text: 'Делаю ленту и раздел друзей',
            text2: 'Рендеринг на kphp и на react',
        },
        jobKoshelek: {
            text: 'Разработка vue компонентов',
            text2: 'Работа с ssr, микросервисной архитектурой, webpack module federation',
            text3: 'Написание unit/e2e тестов для vue компонентов',
            text4: 'Сделал новый раздел на сайте, редактор статей, сервис авторизации',
        },
        jobRozario: {
            text: 'Разработка компонентов на svelte',
            text2: 'Написание тестов unit/e2e',
            text3: 'Разработал почти все компоненты',
            text4: 'Валидация форм',
        },
        jobFreelance: {
            text: 'разработал блог для интернет магазина (react)',
            text2: 'верстка html/css, скрипты на js, react.',
        },
        jobSeventest: {
            text: 'разрботка системы мониторинга сетей на с++'
        },
        university: 'СПБГУТ',
        faculty: 'ИКСС',
        program: 'Программная инженерия',
    },
};

export type Contact = UserLink;

export type Tech = {
    name: string;
    classList?: string;
    desc?: string;
    color?: string;
    bgColor?: string;
}

export type Skill = {
    sectionLang: string;
    tech?: Tech[];
    list?: string[],
}

export type Job = {
    company: string;
    class: string;
    start: Date,
    end?: Date,
    color?: string;
    description: Array<Record<string, string>>;
}

export type Education = {
    universityLang: string,
    class: string,
    image: string,
    start: Date,
    end: Date,
    facultyLang: string,
    programLang: string,
}

export type CV = {
    nameLang: string,
    professionLang: string,
    contacts: Contact[],
    skills: Skill[],
    jobs: Job[],
    educationList: Education[],
    link: string;
    links: UserLink[];
}


export const cvData: CV = {
    nameLang: 'cv.name',
    professionLang: 'cv.profession',
    // move data from "about" dataset
    contacts: [
        {
            icon: 'brand-telegram',
            url: 'https://t.me/rawkangaroo',
            text: 'telegram',
        },
        {
            icon: 'at',
            url: 'mailto:asleeppiano@outlook.com',
            text: 'asleeppiano@outlook.com',
        },
        {
            icon: 'vk',
            url: 'https://vk.com/andrey.parfenov',
            text: 'vk.com/andrey.parfenov',
        },
        {
            url: 'andreyparfenov.com',
            text: 'website',
        },
    ],
    skills: [
        {
            sectionLang: 'cv.programmingLanguages',
            tech: [
                { name: 'php', color: 'white', bgColor: '#8892BF', classList: 'c-lang--php' },
                { name: 'javascript', color: 'black', bgColor: '#f7df1e', classList: 'c-lang--js' },
                { name: 'typescript', color: 'white', bgColor: '#3178c6', classList: 'c-lang--ts' },
                { name: 'html', color: 'white', bgColor: '#dd4a24', classList: 'c-lang--html' },
                { name: 'css', color: 'white', bgColor: '#196fb4', classList: 'c-lang--css' },
            ],
        },
        {
            sectionLang: 'cv.frameworks',
            tech: [
                { name: 'vue', color: 'white', bgColor: '#41b883', classList: 'c-lang--vue' },
                { name: 'svelte', color: 'white', bgColor: '#f73c00', classList: 'c-lang--svelte' },
                {
                    name: 'react',
                    color: 'black',
                    bgColor: '#61dafb',
                    classList: 'c-lang--react',
                    desc: 'cv.usingAtCurrentJob',
                },
            ],
        },
        {
            sectionLang: 'cv.restSection',
            list: ['git', 'docker'],
        },
    ],
    jobs: [
        {
            company: 'ВКонтакте',
            class: 'c-job--vk',
            color: '#0077ff',
            start: new Date('2022-04-13'),
            description: [{ textLang: 'cv.jobVK.text' }, { textLang: 'cv.jobVK.text2' }],
        },
        {
            company: 'Кошелек',
            class: 'c-job--koshelek',
            color: '#0251f8',
            start: new Date('2020-09-14'),
            end: new Date('2022-04-04'),
            description: [
                {textLang: 'cv.jobKoshelek.text'},
                {textLang: 'cv.jobKoshelek.text2'},
                {textLang: 'cv.jobKoshelek.text3'},
                {textLang: 'cv.jobKoshelek.text4'},
            ],
        },
        {
            company: 'Розарио',
            class: 'c-job--rozario',
            color: '#e71f75', 
            start: new Date('2019-11-01'),
            end: new Date('2020-07-01'),
            description: [
                {textLang: 'cv.jobRozario.text'},
                {textLang: 'cv.jobRozario.text2'},
                {textLang: 'cv.jobRozario.text3'},
                {textLang: 'cv.jobRozario.text4'},
            ],
        },
        {
            company: 'Фриланс',
            class: 'c-job--freelance',
            color: 'gray', 
            start: new Date('2019-06-01'),
            end: new Date('2019-11-01'),
            description: [
                {textLang: 'cv.jobFreelance.text'},
                {textLang: 'cv.jobFreelance.text2'},
            ],
        },
        {
            company: 'Севентест',
            class: 'c-job--seventest',
            color: '#ab250c', 
            start: new Date('2017-08-01'),
            end: new Date('2018-01-01'),
            description: [
                {textLang: 'cv.jobSeventest.text'},
            ],
        },
    ],
    educationList: [
        {
            universityLang: 'cv.university',
            class: 'c-education--sut',
            image: '',
            start: new Date('2014-09-01'),
            end: new Date('2018-06-29'),
            facultyLang: 'cv.faculty',
            programLang: 'cv.program',
        },
    ],
    link: '/static/cv',
    links: [
        {
            icon: 'brand-github',
            label: 'github',
            url: 'https://github.com/moody-person',
        },
        {
            label: 'gitlab',
            url: 'https://gitlab.com/asleeppiano',
        }
    ],
};

export function useCVData(): {cvData: CV} {
    return {
        cvData
    }
}

export function isJob(data: unknown): data is Job {
    return (data as Job).company !== undefined;
}

export function isJobList(data: unknown[]): data is Job[]  {
    return Array.isArray(data) && isJob(data[0]);
}

export function isEducation(data: unknown): data is Education {
    return (data as Education).universityLang !== undefined;
}

export function isEducationList(data: unknown[]): data is Education[]  {
    return Array.isArray(data) && isEducation(data[0]);
}

export function isSkill(data: unknown): data is Skill {
    return (data as Skill).tech !== undefined || (data as Skill).list !== undefined;
}

export function isSkillList(data: unknown[]): data is Skill[]  {
    return Array.isArray(data) && isSkill(data[0]);
}