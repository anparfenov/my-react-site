import clsx from 'clsx';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import { MyDevice } from '@features/aboutme/components/MyDevice/MyDevice';
import {
	SimpleLinkItem,
	useSimpleLink,
} from '@components/SimpleLinkItem/SimpleLinkItem';
import { TextWithBack } from 'components/TextWithBack/TextWithBack';
import { aboutData } from 'data/about';
import { i18n } from 'i18n/i18n';
import { AboutGrid } from 'layouts/AboutGrid/AboutGrid';
import { MainLayout } from 'layouts/MainLayout/MainLayout';

import style from './AboutLayout.module.css';

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
			<Head>
				<title>{i18n.t('about.seo.title')}</title>
				<meta
					name="description"
					content={i18n.t('about.seo.description')}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
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
				<div
					className={clsx(
						style.AboutLayoutLinks,
						style.AboutLayoutBox
					)}
				>
					<ul className={clsx(style.AboutLayoutLinkList)}>
						{aboutData.links.map((linkData) => (
							<li
								key={linkData.link.url}
								className={style.AboutLayoutLinkListItem}
							>
								<SimpleLinkItem
									link={linkData.link}
									iconSize={iconSize}
								/>
								{linkData.descriptionLang && (
									<div
										className={
											style.AboutLayoutLinkDescription
										}
									>
										{i18n.t(linkData.descriptionLang)}
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
				<div
					className={clsx(
						style.AboutLayoutDevices,
						style.AboutLayoutBox
					)}
				>
					<ul className={style.AboutLayoutDeviceList}>
						{aboutData.devices.map((device) => (
							<li
								key={device.name}
								className={style.AboutLayoutDeviceListItem}
							>
								<MyDevice device={device} />
							</li>
						))}
					</ul>
				</div>
			</AboutGrid>
		</MainLayout>
	);
};
