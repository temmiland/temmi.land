/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Components/Link',
	component: Link,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		href: '#',
		children: 'This is a link.'
	}
};

export const Inverted: Story = {
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		href: '#',
		children: 'This is a link.'
	}
};
