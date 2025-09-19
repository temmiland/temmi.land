/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import Project from './Project';
import { projects } from '../../../data/projects';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Pages/Project',
	component: Project,
	tags: [''],
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
} satisfies Meta<typeof Project>;

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
		selectedProjectId: projects[0].id
	}
};

