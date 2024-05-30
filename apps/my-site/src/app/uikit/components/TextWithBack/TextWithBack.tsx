import React, { FC, ReactNode } from 'react';

import style from './TextWithBack.module.css';

type TextWithBackProps = {
  children: ReactNode;
  tag?: string;
};

export const TextWithBack: FC<TextWithBackProps> = ({
  children,
  tag = 'h1',
}) => {
  const CustomTag = tag as keyof JSX.IntrinsicElements;
  return (
    <div className={style.TextWithBack}>
      <CustomTag className={style.TextWithBackText}>{children}</CustomTag>
      <div className={style.TextWithBackBack}></div>
    </div>
  );
};
