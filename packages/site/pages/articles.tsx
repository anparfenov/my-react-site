import Head from 'next/head';
import { MainLayout } from 'layouts/MainLayout/MainLayout';
import { TextWithBack } from 'components/TextWithBack/TextWithBack';
import { i18n } from 'i18n/i18n';

import style from 'styles/pages/articles.module.css';

export default function Articles() {
    return (
        <MainLayout>
            <Head>
                <title>{i18n.t('articles.seo.title')}</title>
                <meta
                    name="description"
                    content={i18n.t('articles.seo.description')}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TextWithBack>{i18n.t('articles.name')}</TextWithBack>
            <div className={style.ArticlesNoArticles}>{i18n.t('articles.noArticles')}</div>
            <div></div>
        </MainLayout>
    );
}
