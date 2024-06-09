import React, { FC, ReactNode } from 'react';
import { Skill } from '#lib/data/cv';
import { i18n } from '#lib/i18n/i18n';
import { Chip } from '#uikit/components/Chip/Chip';

import style from './Skill.module.css';

type SkillProps = {
  skill: Skill;
  tag?: keyof JSX.IntrinsicElements;
};

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
