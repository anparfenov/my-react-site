import Head from 'next/head';
import { Hero } from '@components/Hero/Hero';
import { SimpleLayout } from '@layouts/SimpleLayout/SimpleLayout';
import { aboutData } from '@data/about';
import { i18n } from '@i18n/i18n';

export default function Home() {
	return (
		<SimpleLayout>
			<Head>
				<title>{i18n.t('home.seo.title')}</title>
				<meta
					name="description"
					content={i18n.t('home.seo.description')}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Hero userLinks={aboutData.links} />
		</SimpleLayout>
	);
}
