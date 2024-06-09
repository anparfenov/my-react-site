import React, { FC } from 'react';
import {
  Education,
  isEducationList,
  isJobList,
  isSkillList,
  Job,
  Skill,
} from '#lib/data/cv';
import { EducationComponent } from '#widgets/cv/Education/Education';
import { JobComponent } from '#widgets/cv/Job/Job';
import { SkillComponent } from '#widgets/cv/Skill/Skill';

import style from './CVList.module.css';

type CVListProps = {
  cvList: Job[] | Education[] | Skill[];
};

export const CVList: FC<CVListProps> = ({ cvList }) => {
  if (isJobList(cvList)) {
    return (
      <ul className={style.CVList}>
        {cvList.map((job, i) => (
          <li key={`${job.company}${i}`}>
            <JobComponent job={job} />
          </li>
        ))}
      </ul>
    );
  }
  if (isEducationList(cvList)) {
    return (
      <ul className={style.CVList}>
        {cvList.map((education, i) => (
          <li key={`${education.universityLang}${i}`}>
            <EducationComponent education={education} />
          </li>
        ))}
      </ul>
    );
  }
  if (isSkillList(cvList)) {
    return (
      <ul className={style.CVList}>
        {cvList.map((skill, i) => (
          <li className={style.CVListItem} key={`${skill.sectionLang}${i}`}>
            <SkillComponent skill={skill} />
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
