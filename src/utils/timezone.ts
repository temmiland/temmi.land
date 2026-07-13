/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * Gets the UTC offset (in minutes, east-positive) of a timezone at a given date.
 * Needed to compare Temmi's local time zone against the visitor's.
 * @param {string} timeZone - An IANA timezone name (e.g. `'Europe/Berlin'`).
 * @param {Date} date - The date to compute the offset at (offsets vary with DST).
 * @returns {number} The UTC offset in minutes, positive east of UTC.
 */
export const getTimezoneOffsetMinutes = (timeZone: string, date: Date): number => {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hourCycle: 'h23',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
		.formatToParts(date)
		.reduce<Record<string, string>>((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});

	const asUTC = Date.UTC(
		Number(parts.year),
		Number(parts.month) - 1,
		Number(parts.day),
		Number(parts.hour),
		Number(parts.minute),
		Number(parts.second)
	);

	return (asUTC - date.getTime()) / 60000;
};
