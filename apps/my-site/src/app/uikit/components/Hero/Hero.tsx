'use client';
import React, { FC } from 'react';
import { LinkWithDescription } from '#lib/data/about';
import { useMyRouter } from '#lib/navigation/navigation';
import { i18n } from '#lib/i18n/i18n';
import { MyLink, LinkTheme } from '#uikit/components/MyLink/MyLink';
import {
  SimpleLinkItem,
  useSimpleLink,
} from '#uikit/components/SimpleLinkItem/SimpleLinkItem';
import { TextWithBack } from '#uikit/components/TextWithBack/TextWithBack';
import style from './Hero.module.css';

type HeroProps = {
  userLinks: LinkWithDescription[];
};

export const Hero: FC<HeroProps> = ({ userLinks }) => {
  const { navList } = useMyRouter();
  const { iconSize } = useSimpleLink({
    isIcon: Boolean(userLinks.some((linkData) => Boolean(linkData.link.icon))),
  });

  return (
    <div className={style.Hero}>
      <div className={style.HeroMeta}>
        <TextWithBack tag="h1">{i18n.t('admin.name')}</TextWithBack>
        <p className={style.HeroDescription}>{i18n.t('admin.description')}</p>
        <div className={`${style.HeroLinkList}`}>
          {userLinks.map((linkData, i) => (
            <SimpleLinkItem
              key={linkData.link.url}
              link={linkData.link}
              iconSize={iconSize}
              isFirst={i === 0}
            />
          ))}
        </div>
      </div>
      <div className={style.HeroNavListArea}>
        <div className={style.HeroNavList}>
          {navList.slice(1).map((nav) => (
            <MyLink
              key={nav.nameLang}
              href={nav.url}
              isActive={nav.isCurrent}
              theme={LinkTheme.BIG}
            >
              {i18n.t(nav.nameLang)}
            </MyLink>
          ))}
        </div>
      </div>
    </div>
  );
};
