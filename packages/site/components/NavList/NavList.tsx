import React, { FC } from 'react'
import { Nav } from 'features/navigation';
import { NavItem } from 'components/NavItem/NavItem';

import style from './NavList.module.css';

export enum NavTheme {
    HERO = 'hero',
    MAIN = 'main',
}

type NavListProps = {
    navList: Nav[];
    theme: NavTheme;
}

export const NavList: FC<NavListProps> = ({ navList, theme}) => {
    if (theme === NavTheme.MAIN) {
        return (
            <ul className={style.NavListMain}>
                {navList.map((nav) => <NavItem key={nav.nameLang} nav={nav} />)}
            </ul>
          )
    }
    return null;
}
