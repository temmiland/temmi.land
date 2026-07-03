/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * Formats an ISO date string (YYYY-MM-DD) into a readable label like
 * "3 July 2026". Falls back to the raw string if it cannot be parsed.
 * @param {string} isoDate - The ISO date to format.
 * @returns {string} The human-readable date.
 */
export const formatBlogDate = (isoDate: string): string => {
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) {
		return isoDate;
	}
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
};

/**
 * Builds the reading-time label for a post, e.g. "3 min read".
 * @param {number} minutes - The estimated reading time in minutes.
 * @returns {string} The reading-time label.
 */
export const formatReadingTime = (minutes: number): string =>
	`${minutes} min read`;
