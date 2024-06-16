import clsx from 'clsx';
import React, {
  Children,
  cloneElement,
  FC,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react';

import style from './AboutGrid.module.css';

type AboutGridProps = {
  children: ReactNode;
};

export const AboutGrid: FC<AboutGridProps> = ({ children }) => {
  return (
    <div className={style.AboutGrid}>
      {Children.map(children, (child: ReactNode, i) => {
        if (isValidElement(child)) {
          let className: string = child.props.className;
          if (i === 0) {
            className = clsx(className, style.AboutGridText);
          }
          if (i === 1) {
            className = clsx(className, style.AboutGridLinks);
          }
          if (i === 2) {
            className = clsx(className, style.AboutGridDevices);
          }
          if (i === 3) {
            className = clsx(className, style.AboutGridPhoto);
          }
          return cloneElement(child, {
            className: className,
          } as HTMLAttributes<HTMLDivElement>);
        }
        return null;
      })}
    </div>
  );
};
