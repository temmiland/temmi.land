/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { LinkIcon } from './LinkIcon.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Components/LinkIcon',
	component: LinkIcon,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof LinkIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		href: '#',
		icon: {
			prefix: 'fab',
			iconName: 'github'
		},
		size: 3,
		hoverColor: '#d698a1'
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
		icon: {
			prefix: 'fab',
			iconName: 'github'
		},
		size: 3,
		hoverColor: '#d698a1'
	}
};
