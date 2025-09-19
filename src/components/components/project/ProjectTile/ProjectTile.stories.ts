/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { projects } from '../../../../data/projects.ts';
import ProjectTile from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ProjectTile> = {
	title: 'Components/Project/ProjectTile',
	component: ProjectTile,
	tags: ['autodocs'],
	argTypes: {
		projectId: {
			name: 'projectId',
			description: 'Project',
			options: projects.map(projects => projects.id),
			control: {
				type: 'select'
			}
		},
		gridMode: {
			control: {
				type: 'boolean'
			}
		}
	}
} satisfies Meta<typeof ProjectTile>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Standard: Story = {
	args: {
		projectId: 'alimonia',
		gridMode: false
	}
};
