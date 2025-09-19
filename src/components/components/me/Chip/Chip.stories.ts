/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Components/Me/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		color: '#80cee1',
		iconName: 'mug-hot',
		text: 'Frontend Developer'
	}
};
