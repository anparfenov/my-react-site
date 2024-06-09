import React, { FC } from 'react';
import { Education } from '#lib/data/cv';
import { i18n } from '#lib/i18n/i18n';
import { CVDate } from '#widgets/cv/CVDate/CVDate';

import style from './Education.module.css';

type EducationProps = {
  education: Education;
};

export const EducationComponent: FC<EducationProps> = ({ education }) => {
  return (
    <div>
      <h3 className={education.class}>{i18n.t(education.universityLang)}</h3>
      <CVDate start={education.start} end={education.end} />
      <p>{i18n.t(education.programLang)}</p>
      <p>{i18n.t(education.facultyLang)}</p>
    </div>
  );
};
