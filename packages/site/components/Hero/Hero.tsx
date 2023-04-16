import React, { FC } from 'react';
import { UserLink } from 'data/about';
import { useMyRouter } from 'features/navigation';
import { i18n } from 'i18n/i18n';
import { MyLink, LinkTheme } from 'components/MyLink/MyLink';
import { SimpleLinkItem } from 'components/SimpleLinkItem/SimpleLinkItem';
import { TextWithBack } from 'components/TextWithBack/TextWithBack';
import style from './Hero.module.css';

type HeroProps = {
	userLinks: UserLink[];
};

export const Hero: FC<HeroProps> = ({ userLinks }) => {
	const { navList } = useMyRouter();
	return (
		<div className={style.Hero}>
			<div className={style.HeroMeta}>
				<TextWithBack tag="h1">{i18n.t('admin.name')}</TextWithBack>
				<p className={style.HeroDescription}>
					{i18n.t('admin.description')}
				</p>
				<ul className={`${style.HeroLinkList}`}>
					{userLinks.map((link) => (
						<SimpleLinkItem key={link.url} link={link} />
					))}
				</ul>
			</div>
			<div className={style.HeroNavListArea}>
				<ul className={style.HeroNavList}>
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
				</ul>
			</div>
		</div>
	);
};
