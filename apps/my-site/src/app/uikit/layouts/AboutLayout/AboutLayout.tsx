'use client';
import clsx from 'clsx';
import { Metadata } from 'next';
import React, { FC, ReactNode } from 'react';
import { MyDevice } from '#widgets/aboutme/MyDevice/MyDevice';
import {
  SimpleLinkItem,
  useSimpleLink,
} from '#uikit/components/SimpleLinkItem/SimpleLinkItem';
import { TextWithBack } from '#uikit/components/TextWithBack/TextWithBack';
import { aboutData } from '#lib/data/about';
import { i18n } from '#lib/i18n/i18n';
import { AboutGrid } from '#uikit/layouts/AboutGrid/AboutGrid';
import { MainLayout } from '#uikit/layouts/MainLayout/MainLayout';

import style from './AboutLayout.module.css';

export const metadata: Metadata = {
  title: i18n.t('about.seo.title'),
  description: i18n.t('about.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

type FooterProps = {
  children: ReactNode;
};

export const AboutLayout: FC<FooterProps> = ({ children }) => {
  const { iconSize } = useSimpleLink({
    isIcon: Boolean(
      aboutData.links.some((linkData) => Boolean(linkData.link.icon))
    ),
  });

  return (
    <MainLayout>
      <TextWithBack>{i18n.t('about.title')}</TextWithBack>
      <AboutGrid>
        <div
          className={clsx(
            'about-text',
            style.AboutLayoutText,
            style.AboutLayoutBox,
            style.AboutLayoutBoxBorder
          )}
        >
          {children}
        </div>
        <div className={clsx(style.AboutLayoutLinks, style.AboutLayoutBox)}>
          <ul className={clsx(style.AboutLayoutLinkList)}>
            {aboutData.links.map((linkData) => (
              <li
                key={linkData.link.url}
                className={style.AboutLayoutLinkListItem}
              >
                <SimpleLinkItem link={linkData.link} iconSize={iconSize} />
                {linkData.descriptionLang && (
                  <div className={style.AboutLayoutLinkDescription}>
                    {i18n.t(linkData.descriptionLang)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={clsx(style.AboutLayoutDevices, style.AboutLayoutBox)}>
          <ul className={style.AboutLayoutDeviceList}>
            {aboutData.devices.map((device) => (
              <li key={device.name} className={style.AboutLayoutDeviceListItem}>
                <MyDevice device={device} />
              </li>
            ))}
          </ul>
        </div>
      </AboutGrid>
    </MainLayout>
  );
};
