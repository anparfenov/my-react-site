import clsx from 'clsx';
import React, { FC } from 'react';
import { format } from 'date-fns';
import style from './CVDate.module.css';
import { i18n } from '#lib/i18n/i18n';

type CVDateProps = {
  start: Date;
  end?: Date;
};

export const CVDate: FC<CVDateProps> = ({ start, end }) => {
  return (
    <div className={clsx(style.CVDate)}>
      <span>{format(start, 'MMM yyyy')}</span>
      {' - '}
      {end ? <span>{format(end, 'MMM yyyy')}</span> : i18n.t('cv.currentTime')}
    </div>
  );
};
