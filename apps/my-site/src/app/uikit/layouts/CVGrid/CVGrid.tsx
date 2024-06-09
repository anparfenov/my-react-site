import clsx from 'clsx';
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from 'react';

import style from './CVGrid.module.css';

type CVGridProps = {
  children: ReactNode;
};

export const CVGrid: FC<CVGridProps> = ({ children }) => {
  return (
    <div className={style.CVGrid}>
      {Children.map(children, (child, i) => {
        if (isValidElement(child)) {
          let className = child.props.className;
          // NOTE: implicit class assignment. Hard to read
          // maybe i can make it better
          if (i === 0) {
            className = clsx(className, style.CVGridHeader);
          }
          if (i === 1) {
            className = clsx(className, style.CVGridProfession);
          }
          if (i === 2) {
            className = clsx(className, style.CVGridContacts);
          }
          if (i === 3) {
            className = clsx(className, style.CVGridSkills);
          }
          if (i === 4) {
            className = clsx(className, style.CVGridJobs);
          }
          if (i === 5) {
            className = clsx(className, style.CVGridEducation);
          }
          return cloneElement(child, { className });
        }
        return null;
      })}
    </div>
  );
};
