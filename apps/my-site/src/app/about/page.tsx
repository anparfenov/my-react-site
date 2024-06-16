import { MainLayout } from '#uikit/layouts/MainLayout/MainLayout';
import { clsx } from 'clsx';
import React from 'react';
import { SimpleLinkItem } from '#uikit/components/SimpleLinkItem/SimpleLinkItem';
import { aboutData } from '#lib/data/about';
import { Metadata } from 'next';
import { i18n } from '#lib/i18n/i18n';
import style from './About.module.css';
import { AboutGrid } from '#uikit/layouts/AboutGrid/AboutGrid';

function getAboutData() {
  return aboutData;
}

export const metadata: Metadata = {
  title: i18n.t('about.seo.title'),
  description: i18n.t('about.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function About() {
  const aboutData = getAboutData();

  return (
    <MainLayout>
      <AboutGrid>
        <div
          className={clsx(
            'about-text',
            style.AboutLayoutText,
            style.AboutLayoutBox,
            style.AboutLayoutBoxBorder
          )}
        >
          <p>Привет 🖐, меня зовут Андрей. Я разработчик интерфейсов.</p>
          <p>
            💻 Работаю во ВКонтакте. ⌨️ Пишу на javascript/typescript/react,
            php/kphp
          </p>
          <p>😁 Нравится писать клиентский код под веб или десктоп.</p>
        </div>
        <div className={clsx(style.AboutLayoutLinks, style.AboutLayoutBox)}>
          <ul className={clsx(style.AboutLayoutLinkList)}>
            {aboutData.links.map((linkData) => (
              <li
                key={linkData.link.url}
                className={style.AboutLayoutLinkListItem}
              >
                <SimpleLinkItem
                  label={linkData.link.label ?? ''}
                  link={linkData.link}
                  iconSize={20}
                />
              </li>
            ))}
          </ul>
        </div>
      </AboutGrid>
    </MainLayout>
  );
}
