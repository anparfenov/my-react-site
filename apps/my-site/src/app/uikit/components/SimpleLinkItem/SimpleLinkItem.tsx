import {
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandTelegram,
  IconBrandVk,
} from '@tabler/icons-react';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { UserLink } from '#lib/data/about';
import { i18n } from '#lib/i18n/i18n';
import { LinkTheme, MyLink } from '#uikit/components/MyLink/MyLink';

type UseSimpleLinkProps = {
  isIcon: boolean;
};

export function useSimpleLink({ isIcon }: UseSimpleLinkProps) {
  const [iconSize, setIconSize] = useState(26);
  useEffect(() => {
    let mediaQuery: MediaQueryList | null = null;
    let handleTabletChange: ((e: MediaQueryListEvent) => void) | null = null;
    if (isIcon) {
      // NOTE: sync with --tablet-width in custom-media.css
      mediaQuery = window.matchMedia('(min-width: 768px)');

      handleTabletChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          setIconSize(26);
        } else {
          setIconSize(28);
        }
      };

      mediaQuery.addEventListener('change', handleTabletChange);

      // FIXME: don't use "as unknown"
      handleTabletChange(mediaQuery as unknown as MediaQueryListEvent);
    }

    return () => {
      if (mediaQuery && handleTabletChange) {
        mediaQuery.removeEventListener('change', handleTabletChange);
      }
    };
  }, [isIcon]);

  return {
    iconSize,
  };
}

type SimpleLinkItemProps = {
  link: UserLink;
  isFirst?: boolean;
  iconSize: number;
};

export const SimpleLinkItem: FC<SimpleLinkItemProps> = ({
  link,
  isFirst,
  iconSize,
}) => {
  if (link.text || link.textLang) {
    return (
      <MyLink
        href={link.url}
        theme={LinkTheme.SIMPLE}
        isActive={link.isActive}
        isFirst={isFirst}
      >
        {link.textLang ? i18n.t(link.textLang) : link.text}
      </MyLink>
    );
  } else if (link.icon) {
    if (link.icon) {
      let icon: ReactNode = '';
      if (link.icon === 'brand-gitlab') {
        icon = <IconBrandGitlab color="currentColor" size={iconSize} />;
      } else if (link.icon === 'brand-github') {
        icon = <IconBrandGithub color="currentColor" size={iconSize} />;
      } else if (link.icon === 'brand-vk') {
        icon = <IconBrandVk color="currentColor" size={iconSize} />;
      } else if (link.icon === 'brand-telegram') {
        icon = <IconBrandTelegram color="currentColor" size={iconSize} />;
      }
      return (
        <MyLink
          href={link.url}
          aria-label={link.label}
          theme={LinkTheme.ICON}
          isActive={link.isActive}
          isFirst={isFirst}
        >
          {icon}
        </MyLink>
      );
    }
    return (
      <MyLink
        key={link.url}
        href={link.url}
        theme={LinkTheme.SIMPLE}
        isActive={link.isActive}
        isFirst={isFirst}
      >
        {link.textLang ? i18n.t(link.textLang) : link.text}
      </MyLink>
    );
  }
  return null;
};
