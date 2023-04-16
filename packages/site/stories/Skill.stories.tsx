import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkillComponent } from '../components/Skill/Skill';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Skill',
  component: SkillComponent,
} as ComponentMeta<typeof SkillComponent>;

const Template: ComponentStory<typeof SkillComponent> = (args) => <SkillComponent {...args} ></SkillComponent>;

export const Default = Template.bind({});
Default.args = {
    skill: {
        sectionLang: 'cv.skills',
        tech: [{name: 'description', classList: 'cl'}, {name: 'description2', classList: 'cl'}],
    }
};