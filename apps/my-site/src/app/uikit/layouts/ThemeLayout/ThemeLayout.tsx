import React, { FC, ReactNode } from 'react';
import { Overpass, JetBrains_Mono } from 'next/font/google';
import clsx from 'clsx';

const overpassFont = Overpass({
  subsets: ['latin', 'cyrillic'],
  style: ['normal'],
  variable: '--font-overpass',
});

const jetBrainsMonoFont = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  style: ['normal'],
  variable: '--font-jetbrainsmono',
});

type ThemeLayoutProps = {
  children: ReactNode;
};

export const ThemeLayout: FC<ThemeLayoutProps> = ({ children }) => {
  return (
    <div
      className={clsx(
        's-common',
        's-light-theme',
        'default-layout',
        jetBrainsMonoFont.variable,
        overpassFont.variable
      )}
    >
      {children}
    </div>
  );
};
