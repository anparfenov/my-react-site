import React, { FC, ReactNode } from 'react';
import style from './SimpleLayout.module.css';

type SimpleLayoutProps = {
  children: ReactNode;
};

export const SimpleLayout: FC<SimpleLayoutProps> = ({ children }) => {
  return <main className={style.SimpleLayout}>{children}</main>;
};
