import React, { FC } from 'react';
import { RepoStructure } from '#lib/projects/projects.types';
import { MyImage } from '#widgets/image/MyImage/MyImage';
import { LinkTheme, MyLink } from '#uikit/components/MyLink/MyLink';

import style from './Project.module.css';

type ProjectProps = {
  project: RepoStructure;
};

export const Project: FC<ProjectProps> = ({ project }: ProjectProps) => {
  return (
    <div className={style.Project}>
      <a href={project.link} className={style.ProjectLink}>
        <div className={style.ProjectImage}>
          <MyImage
            height={project.image?.height}
            width={project.image?.width}
            src={project.image?.src}
            alt={project.description}
          />
        </div>
      </a>
      <div className={style.ProjectMeta}>
        <div className={style.ProjectLink}>
          <MyLink theme={LinkTheme.SIMPLE} href={project.link}>
            <h3 className={style.ProjectTitle}>{project.title}</h3>
          </MyLink>
        </div>
        <div className={style.ProjectRepo}>
          <MyLink theme={LinkTheme.SIMPLE} href={project.repo.link}>
            {project.repo.name}
          </MyLink>
        </div>
      </div>
    </div>
  );
};
