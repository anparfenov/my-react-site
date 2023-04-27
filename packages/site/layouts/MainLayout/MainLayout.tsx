import React, { FC, ReactNode } from 'react';
import { Footer } from '@components/Footer/Footer';
import { Header } from '@components/Header/Header';
import style from './MainLayout.module.css';

type MainLayoutProps = {
    children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={style.MainLayout}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
