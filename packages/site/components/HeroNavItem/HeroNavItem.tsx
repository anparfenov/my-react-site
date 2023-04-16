import React, { FC } from 'react';
import { Nav } from 'features/navigation';
import { i18n } from 'i18n/i18n';
import { ZoomWord } from 'components/ZoomWord/ZoomWord';
import style from './HeroNavItem.module.css';

type HeroNavItemProps = { nav: Nav };

export const HeroNavItem: FC<HeroNavItemProps> = ({ nav }) => {
    return (
        <li className={style.HeroNavItem}>
            <div>
                <ZoomWord nameLang={nav.nameLang}>
                    {nav.isCurrent ? (
                        <span className={style.HeroNavItemText}>
                            {i18n.t(nav.nameLang)}
                        </span>
                    ) : (
                        <a className={style.HeroNavItemLink} href={nav.url}>
                            {i18n.t(nav.nameLang)}
                        </a>
                    )}
                </ZoomWord>
            </div>
        </li>
    );
};
