import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyLink, LinkTheme } from '../components/MyLink/MyLink';
import { IconBrandAmongus } from '@tabler/icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MyLink',
  component: MyLink,
} as ComponentMeta<typeof MyLink>;

const Template: ComponentStory<typeof MyLink> = (args) => <MyLink {...args} >my link</MyLink>;
const TemplateWithIcon: ComponentStory<typeof MyLink> = (args) => <MyLink {...args} ><IconBrandAmongus /></MyLink>;


export const Big = Template.bind({});
Big.args = {
  theme: LinkTheme.BIG,
  href: '/'
};

export const Simple = Template.bind({});
Simple.args = {
  theme: LinkTheme.SIMPLE,
  href: '/',
};

export const Icon = TemplateWithIcon.bind({});
Icon.args = {
  theme: LinkTheme.ICON,
  href: '/',
};

export const Primary = Template.bind({});
Primary.args = {
  theme: LinkTheme.PRIMARY,
  href: '/',
};