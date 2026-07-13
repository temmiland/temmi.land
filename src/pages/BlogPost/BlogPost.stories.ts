/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import type { Meta, StoryObj } from '@storybook/react';

import BlogPost from './BlogPost';
import { blogPosts } from '@/data/blog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Pages/BlogPost',
	component: BlogPost,
	tags: [''],
	argTypes: {
		postId: {
			name: 'post',
			description: 'Blog post',
			options: blogPosts.map((post) => post.id),
			control: {
				type: 'select'
			}
		}
	}
} satisfies Meta<typeof BlogPost>;

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
		postId: blogPosts[0].id
	}
};
