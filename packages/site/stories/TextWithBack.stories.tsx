import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextWithBack } from '../components/TextWithBack/TextWithBack';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextWithBack',
  component: TextWithBack,
} as ComponentMeta<typeof TextWithBack>;

const Template: ComponentStory<typeof TextWithBack> = (args) => <TextWithBack {...args} >text with back</TextWithBack>;

export const Default = Template.bind({});
Default.args = {};