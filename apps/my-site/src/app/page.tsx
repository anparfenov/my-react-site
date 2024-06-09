import { Hero } from '#uikit/components/Hero/Hero';
import { SimpleLayout } from '#uikit/layouts/SimpleLayout/SimpleLayout';
import { aboutData } from '#lib/data/about';
import { i18n } from '#lib/i18n/i18n';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: i18n.t('home.seo.title'),
  description: i18n.t('home.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Index() {
  return (
    <SimpleLayout>
      <Hero userLinks={aboutData.links} />
    </SimpleLayout>
  );
}
