'use client';
import React from 'react';
import { useMyRouter } from '#lib/navigation/navigation';
import { i18n } from '#lib/i18n/i18n';
import { LinkTheme, MyLink } from '#uikit/components/MyLink/MyLink';

import style from './Header.module.css';

export const Header = (): React.JSX.Element => {
  const { navList } = useMyRouter();
  return (
    <header className={style.Header}>
      <ul className={style.HeaderNavList}>
        {navList.map((nav) => (
          <MyLink
            key={nav.nameLang}
            href={nav.url}
            isActive={nav.isCurrent}
            theme={LinkTheme.PRIMARY}
          >
            {i18n.t(nav.nameLang)}
          </MyLink>
        ))}
      </ul>
    </header>
  );
};
