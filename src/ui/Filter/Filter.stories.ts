/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Filter } from './Filter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'UI/Filter',
	component: Filter,
	tags: ['autodocs'],
	args: {
		onChange: fn()
	}
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{
		value: 'typescript',
		label: 'Typescript'
	},
	{
		value: 'react',
		label: 'React'
	},
	{
		value: 'kotlin',
		label: 'Kotlin'
	}
];

export const Standard: Story = {
	args: {
		options,
		activeValue: ''
	}
};

export const WithActiveOption: Story = {
	args: {
		options,
		activeValue: 'react'
	}
};

/**
 * Clicking an option chip reports its value; the built-in "All" chip clears
 * the filter by reporting an empty value.
 */
export const SelectsAndClearsFilter: Story = {
	args: {
		options,
		activeValue: ''
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);

		const reactChip = canvas.getAllByRole('button', {
			name: 'React'
		})[0];
		await userEvent.click(reactChip);
		await expect(args.onChange).toHaveBeenCalledWith('react');

		const allChip = canvas.getAllByRole('button', {
			name: 'All'
		})[0];
		await userEvent.click(allChip);
		await expect(args.onChange).toHaveBeenCalledWith('');
		await expect(args.onChange).toHaveBeenCalledTimes(2);
	}
};

/**
 * The active option is highlighted via the 'active' class on its chip.
 */
export const HighlightsActiveOption: Story = {
	args: {
		options,
		activeValue: 'kotlin'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const kotlinChip = canvas.getAllByRole('button', {
			name: 'Kotlin'
		})[0];
		await expect(kotlinChip).toHaveClass('active');

		const allChip = canvas.getAllByRole('button', {
			name: 'All'
		})[0];
		await expect(allChip).not.toHaveClass('active');
	}
};
