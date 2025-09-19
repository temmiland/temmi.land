/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Layouts/Header',
	component: Header
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		visible: {
			min: {
				phone: 0,
				tablet: 0,
				desktop: 0,
				oversize: 0
			},
			max: {
				phone: Infinity,
				tablet: Infinity,
				desktop: Infinity,
				oversize: Infinity
			}
		}
	}
};
