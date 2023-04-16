import React, { FC } from 'react';
import {
	Education,
	isEducationList,
	isJobList,
	isSkillList,
	Job,
	Skill,
} from 'data/cv';
import { EducationComponent } from 'components/Education/Education';
import { JobComponent } from 'components/Job/Job';
import { SkillComponent } from 'components/Skill/Skill';

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
