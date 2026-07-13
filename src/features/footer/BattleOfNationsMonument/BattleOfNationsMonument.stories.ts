/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { BattleOfNationsMonument } from './BattleOfNationsMonument.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Features/Footer/BattleOfNationsMonument',
	component: BattleOfNationsMonument,
	tags: ['autodocs']
} satisfies Meta<typeof BattleOfNationsMonument>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		size: 3
	}
};

export const Inverted: Story = {
	parameters: {
		backgrounds: {
			default: 'dark'
		}
	},
	args: {
		size: 3
	}
};
