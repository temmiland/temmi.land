/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { MadeWithLoveInDresden } from './MadeWithLoveInDresden.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Components/Footer/MadeWithLoveInDresden',
	component: MadeWithLoveInDresden,
	tags: ['autodocs']
} satisfies Meta<typeof MadeWithLoveInDresden>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {}
};

export const Inverted: Story = {
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	args: {}
};
