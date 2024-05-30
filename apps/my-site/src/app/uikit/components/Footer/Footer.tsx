'use client';
import { IconBrandGithub } from '@tabler/icons-react';
import React, { FC } from 'react';
import { i18n } from '#lib/i18n/i18n';
import { LinkTheme, MyLink } from '#uikit/components/MyLink/MyLink';
import { Tooltip, useTooltipMedia } from '#uikit/components/Tooltip/Tooltip';
import style from './Footer.module.css';

interface FooterProps {
  repoLink: string;
}

export const Footer: FC<FooterProps> = ({ repoLink }) => {
  const currentYear = new Date().getFullYear();
  const { infoIcon } = useTooltipMedia();
  return (
    <footer className={style.Footer}>
      <div className={style.FooterTech}>
        <span>{i18n.t('footer.madeWith')}</span>
        <Tooltip text={i18n.t('footer.react')} infoIcon={infoIcon}>
          <MyLink theme={LinkTheme.SIMPLE} href="https://nextjs.org/">
            next.js
          </MyLink>
        </Tooltip>
      </div>
      <div className={style.FooterCopyRight}>
        © 2021 - {currentYear} {i18n.t('admin.name')}
      </div>
      <div className={style.FooterSources}>
        <span>{i18n.t('footer.sources')}</span>
        <MyLink theme={LinkTheme.ICON} href={repoLink}>
          <IconBrandGithub size={22} color="currentColor" />
        </MyLink>
      </div>
    </footer>
  );
};
