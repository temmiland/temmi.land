/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { projects } from '../src/data/projects';
import { blogPosts } from '../src/data/blog';

const BASE_URL = 'https://temmi.land';

type SitemapEntry = {
	loc: string;
	changefreq: 'weekly' | 'monthly';
	priority: string;
	/** ISO date (YYYY-MM-DD) the content last changed. Google ignores changefreq/priority but reads this. */
	lastmod?: string;
};

const entries: SitemapEntry[] = [
	{
		loc: BASE_URL, changefreq: 'weekly', priority: '1.0'
	},
	{
		loc: `${BASE_URL}/project`, changefreq: 'weekly', priority: '0.8'
	},
	...projects.map((project): SitemapEntry => ({
		loc: `${BASE_URL}/project/${project.id}`, changefreq: 'weekly', priority: '0.8'
	})),
	{
		loc: `${BASE_URL}/skills`, changefreq: 'weekly', priority: '0.7'
	},
	{
		loc: `${BASE_URL}/blog`, changefreq: 'weekly', priority: '0.7'
	},
	...blogPosts.map((post): SitemapEntry => ({
		loc: `${BASE_URL}/blog/${post.id}`, changefreq: 'monthly', priority: '0.6', lastmod: post.date
	})),
	{
		loc: `${BASE_URL}/privacy`, changefreq: 'monthly', priority: '0.5'
	},
	{
		loc: `${BASE_URL}/imprint`, changefreq: 'monthly', priority: '0.5'
	}
];

const urls = entries.map((entry) => (
	'\t<url>\n' +
	`\t\t<loc>${entry.loc}</loc>\n` +
	(entry.lastmod ? `\t\t<lastmod>${entry.lastmod}</lastmod>\n` : '') +
	`\t\t<changefreq>${entry.changefreq}</changefreq>\n` +
	`\t\t<priority>${entry.priority}</priority>\n` +
	'\t</url>'
)).join('\n');

const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
	`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outPath = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(outPath, xml);

// eslint-disable-next-line no-console
console.log(`Generated sitemap.xml with ${entries.length} URLs -> ${outPath}`);
