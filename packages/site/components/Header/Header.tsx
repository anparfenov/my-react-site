import React, { FC, ReactNode } from 'react';
import { useMyRouter } from 'features/navigation';
import { i18n } from 'i18n/i18n';
import { LinkTheme, MyLink } from 'components/MyLink/MyLink';

import style from './Header.module.css';

type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
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
