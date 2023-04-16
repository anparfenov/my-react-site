import React, { FC, ReactNode } from 'react';
import { Skill } from 'data/cv';
import { i18n } from 'i18n/i18n';
import { Chip } from 'components/Chip/Chip';

import style from './Skill.module.css';

type SkillProps = {
	skill: Skill;
	tag?: keyof JSX.IntrinsicElements;
};

// TODO remove li tag, use div
export const SkillComponent: FC<SkillProps> = ({ skill, tag }) => {
	let list: ReactNode = '';
	if (skill.tech) {
		list = (
			<ul className={style.SkillList}>
				{skill.tech?.map((techItem) => (
					<li key={techItem.name}>
						<Chip color={techItem.color} bgColor={techItem.bgColor}>
							{techItem.name}
						</Chip>
					</li>
				))}
			</ul>
		);
	} else if (skill.list) {
		list = (
			<ul className={style.SkillList}>
				{skill.list?.map((listItem) => (
					<li key={listItem}>
						<Chip>{listItem}</Chip>
					</li>
				))}
			</ul>
		);
	}

	return (
		<div className={style.Skill} key={skill.sectionLang}>
			<h3 className={style.SkillTitle}>{i18n.t(skill.sectionLang)}</h3>
			{list}
		</div>
	);
};
