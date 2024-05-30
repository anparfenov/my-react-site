import clsx from 'clsx';
import Link from 'next/link';
import React, { FC, forwardRef, MouseEventHandler, ReactNode } from 'react';
import style from './MyLink.module.css';

export enum LinkTheme {
  BIG = 'big',
  SIMPLE = 'simple',
  ICON = 'icon',
  PRIMARY = 'primary',
}

type MyLinkProps = {
  theme: LinkTheme;
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  isFirst?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const MyLink: FC<MyLinkProps> = forwardRef<
  HTMLDivElement | null,
  MyLinkProps
>(function MyLink(
  { href, theme, children, className, isActive = false, isFirst = false },
  ref
) {
  if (ref) {
    return (
      <span ref={ref}>
        <Link
          href={href}
          className={clsx({
            [style.MyLinkActive]: isActive,
            [style.MyLinkBig]: theme === LinkTheme.BIG,
            [style.MyLinkSimple]: theme === LinkTheme.SIMPLE,
            [style.MyLinkIcon]: theme === LinkTheme.ICON,
            [style.MyLinkPrimary]: theme === LinkTheme.PRIMARY,
            [style.MyLinkIsFirst]: isFirst,
            className,
          })}
        >
          {children}
        </Link>
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={clsx({
        [style.MyLinkActive]: isActive,
        [style.MyLinkBig]: theme === LinkTheme.BIG,
        [style.MyLinkSimple]: theme === LinkTheme.SIMPLE,
        [style.MyLinkIcon]: theme === LinkTheme.ICON,
        [style.MyLinkPrimary]: theme === LinkTheme.PRIMARY,
        [style.MyLinkIsFirst]: isFirst,
        className,
      })}
    >
      {children}
    </Link>
  );
});
