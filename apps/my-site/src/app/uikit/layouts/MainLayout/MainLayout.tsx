import React, { FC, ReactNode } from 'react';
import { Footer } from '#uikit/components/Footer/Footer';
import { Header } from '#uikit/components/Header/Header';
import style from './MainLayout.module.css';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={style.MainLayout}>
      <Header />
      <main>{children}</main>
      <Footer repoLink="https://github.com/an.parfenov/my-site" />
    </div>
  );
};
