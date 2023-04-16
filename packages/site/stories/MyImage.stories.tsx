import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MyImage } from '../components/MyImage/MyImage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MyImage',
  component: MyImage,
} as ComponentMeta<typeof MyImage>;

const DefaultTemplate: ComponentStory<typeof MyImage> = (args) => <MyImage {...args} ></MyImage>;

export const Default = DefaultTemplate.bind({});
Default.args = {
  width: 774,
  height: 500,
  src: 'https://i.pickadummy.com/300x150?border=5&bordercolor=000000',
};