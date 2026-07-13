/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { skills } from '@/data/skills';
import SkillCard from './index';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SkillCard> = {
	title: 'Features/Skills/SkillCard',
	component: SkillCard,
	tags: ['autodocs'],
	argTypes: {
		skill: {
			name: 'skill',
			description: 'Skill',
			options: skills.map((skill) => skill.id),
			mapping: Object.fromEntries(skills.map((skill) => [skill.id, skill])),
			control: {
				type: 'select'
			}
		}
	}
} satisfies Meta<typeof SkillCard>;

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
		skill: skills.find((skill) => skill.id === 'react')
	}
};
