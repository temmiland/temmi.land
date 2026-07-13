/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Page } from '@/models/page';

export const pages: Page[] = [
	{
		name: 'Home',
		href: '/'
	},
	{
		name: 'About Me',
		href: '/#about-me'
	},
	{
		name: 'Blog',
		href: '/blog',
		sectionId: 'blog'
	},
	{
		name: 'Skills',
		href: '/skills',
		sectionId: 'skills'
	},
	{
		name: 'Projects',
		href: '/project',
		sectionId: 'projects'
	}
];
