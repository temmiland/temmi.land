/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { ProjectGrid } from './ProjectGrid.tsx';
import { projects } from '@/data/projects.ts';
import { blogPosts } from '@/data/blog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Features/Projects/ProjectGrid',
	component: ProjectGrid,
	tags: ['autodocs'],
	argTypes: {
		selectedProjectId: {
			name: 'project',
			description: 'Project',
			options: projects.map(project => project.id),
			control: {
				type: 'select'
			}
		}
	}
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		projects,
		blogPosts,
		selectedProjectId: projects[0].id
	}
};

/**
 * Clicking a tile expands its detail panel (description, links, tech stack);
 * the close handle collapses it again.
 */
export const ExpandAndClose: Story = {
	args: {
		projects,
		blogPosts
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const tile = canvas.getAllByRole('heading', {
			name: new RegExp(projects[0].name, 'i')
		})[0];
		await userEvent.click(tile);

		await waitFor(async () => {
			await expect(canvas.getByText('Description')).toBeVisible();
		}, {
			timeout: 3000
		});
		await expect(canvas.getByText('Links')).toBeVisible();

		// The click handler sits on the styled handle inside the
		// '.close-handle' wrapper, so target that element directly.
		const closeHandle = canvasElement.querySelector('.close-handle > div');
		await expect(closeHandle).not.toBeNull();
		await userEvent.click(closeHandle as HTMLElement);

		// The grid keeps the panel content mounted while collapsing, so assert
		// on the expanded marker class instead of the panel text.
		await waitFor(() => {
			if (canvasElement.querySelector('.expanded') !== null) {
				throw new Error('detail panel is still expanded');
			}
		}, {
			timeout: 3000
		});
	}
};
