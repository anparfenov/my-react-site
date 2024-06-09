import { MainLayout } from '#uikit/layouts/MainLayout/MainLayout';
import { useCVData } from '#lib/data/cv';
import { TextWithBack } from '#uikit/components/TextWithBack/TextWithBack';
import { i18n } from '#lib/i18n/i18n';
import {
  IconAt,
  IconBrandTelegram,
  IconBrandVk,
  IconFile,
} from '@tabler/icons-react';
import { LinkTheme, MyLink } from '#uikit/components/MyLink/MyLink';
import { CVList } from '#widgets/cv/CVList/CVList';
import { CVGrid } from '#uikit/layouts/CVGrid/CVGrid';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import style from './cv.module.css';

export const metadata: Metadata = {
  title: i18n.t('cv.seo.title'),
  description: i18n.t('cv.seo.description'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function CV() {
  const { cvData } = useCVData();

  return (
    <MainLayout>
      <CVGrid>
        <div className={style.CVHeader}>
          <TextWithBack>{i18n.t('cv.name')}</TextWithBack>
          <MyLink theme={LinkTheme.SIMPLE} href={cvData.link}>
            <IconFile /> pdf
          </MyLink>
        </div>
        <p>{i18n.t('cv.profession')}</p>
        <div>
          <ul className={clsx(style.CVContactsList)}>
            {cvData.contacts.slice(0, 3).map((link) => {
              let icon: ReactNode = '';
              if (link.icon === 'brand-telegram') {
                icon = <IconBrandTelegram color={'black'} />;
              }
              if (link.icon === 'at') {
                icon = <IconAt color={'black'} />;
              }
              if (link.icon === 'vk') {
                icon = <IconBrandVk color={'black'} />;
              }
              return (
                <MyLink key={link.url} theme={LinkTheme.SIMPLE} href={link.url}>
                  {icon} {link.text}
                </MyLink>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className={style.CVTitle}>{i18n.t('cv.skills')}</h2>
          <CVList cvList={cvData.skills} />
        </div>
        <div>
          <h2 className={style.CVTitle}>{i18n.t('cv.jobExperience')}</h2>
          <CVList cvList={cvData.jobs} />
        </div>
        <div>
          <h2 className={style.CVTitle}>{i18n.t('cv.education')}</h2>
          <CVList cvList={cvData.educationList} />
        </div>
      </CVGrid>
    </MainLayout>
  );
}
