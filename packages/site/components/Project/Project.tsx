import { IconBrandGithub, IconBrandGitlab } from '@tabler/icons';
import React, { FC, ReactNode } from 'react';
import { RepoName, RepoStructure } from 'features/projects.types';
import { MyImage } from 'components/MyImage/MyImage';
import { LinkTheme, MyLink } from 'components/MyLink/MyLink';

import style from './Project.module.css';

type GitHostingIconProps = {
    name: RepoName;
    link: string;
    projectName: string;
};

// TODO move to component, make more generic
const GitHostingIcon: FC<GitHostingIconProps> = ({
    name,
    link,
    projectName,
}) => {
    let icon: ReactNode = '';
    if (name === RepoName.GITLAB) {
        icon = <IconBrandGitlab color="currentColor" size={22} />;
    } else if (name === RepoName.GITHUB) {
        icon = <IconBrandGithub color="currentColor" size={22} />;
    }
    return (
        <MyLink href={link} aria-label={projectName} theme={LinkTheme.ICON}>
            {icon}
        </MyLink>
    );
};

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
