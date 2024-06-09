import React, { FC } from 'react';
import { Job } from '#lib/data/cv';
import { i18n } from '#lib/i18n/i18n';
import { CVDate } from '#widgets/cv/CVDate/CVDate';

import style from './Job.module.css';

type JobProps = {
  job: Job;
};

export const JobComponent: FC<JobProps> = ({ job }) => {
  return (
    <div>
      <h3 className={job.class}>{job.company}</h3>
      <CVDate start={job.start} end={job.end} />
      <ul className={style.JobDescriptionList}>
        {job.description?.map((descriptionItem, i) => (
          <li key={i} className={style.JobDescriptionListItem}>
            {i18n.t(descriptionItem.textLang)}
          </li>
        ))}
      </ul>
    </div>
  );
};
