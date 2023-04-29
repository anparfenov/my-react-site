import { IconBrandGithub } from '@tabler/icons';
import React, { FC } from 'react';
import { i18n } from 'i18n/i18n';
import { LinkTheme, MyLink } from '@components/MyLink/MyLink';

import style from './Footer.module.css';
import { Tooltip, useTooltipMedia } from '@components/Tooltip/Tooltip';

type FooterProps = {};

export const Footer: FC<FooterProps> = ({}) => {
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
				<MyLink
					theme={LinkTheme.ICON}
					href="https://github.com/moody-person/my-site"
				>
					<IconBrandGithub size={22} color="currentColor" />
				</MyLink>
			</div>
		</footer>
	);
};
