import React, { FC } from 'react';
import { RepoStructure } from '#lib/projects/projects.types';
import { Project } from '#widgets/projects/Project/Project';

import style from './ProjectsList.module.css';

type ProjectsListProps = {
  projects: RepoStructure[];
};

export const ProjectsList: FC<ProjectsListProps> = ({ projects }) => {
  return (
    <ul className={style.ProjectsList}>
      {projects.map((project) => (
        <li key={project.id} className={style.ProjectsListItem}>
          <Project project={project} />
        </li>
      ))}
    </ul>
  );
};
