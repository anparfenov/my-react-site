import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Chip } from '../components/Chip/Chip';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Chip',
  component: Chip,
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = (args) => <Chip {...args} >chip</Chip>;

export const Default = Template.bind({});
Default.args = {};