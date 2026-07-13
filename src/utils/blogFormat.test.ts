/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { describe, expect, it } from 'vitest';
import { formatBlogDate, formatReadingTime } from './blogFormat';

describe('formatBlogDate', () => {
	it('formats an ISO date as "D Month YYYY"', () => {
		expect(formatBlogDate('2026-07-03')).toBe('3 July 2026');
	});

	it('pads single-digit months and days correctly', () => {
		expect(formatBlogDate('2026-01-01')).toBe('1 January 2026');
	});

	it('falls back to the raw string for an unparseable date', () => {
		expect(formatBlogDate('not-a-date')).toBe('not-a-date');
	});
});

describe('formatReadingTime', () => {
	it('formats whole minutes', () => {
		expect(formatReadingTime(3)).toBe('3 min read');
	});

	it('formats a single minute without special-casing "minute" vs "minutes"', () => {
		expect(formatReadingTime(1)).toBe('1 min read');
	});
});
