/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * The order in which skill fields are written to the CSV export, along
 * with the human-readable column header used for each field.
 */
const CSV_COLUMNS: { key: keyof Skill; label: string }[] = [
	{
		key: 'name',
		label: 'Skill'
	},
	{
		key: 'category',
		label: 'Category'
	},
	{
		key: 'rating',
		label: 'Rating (1-5)'
	},
	{
		key: 'years',
		label: 'Experience in Years'
	},
	{
		key: 'lastUsed',
		label: 'Last used'
	},
	{
		key: 'version',
		label: 'Version'
	},
	{
		key: 'description',
		label: 'Description'
	}
];

/**
 * Escapes a single value for safe inclusion in a CSV cell.
 * @param {string | number | undefined} value - The value to escape.
 * @returns {string} The escaped value.
 */
const escapeCsv = (value: string | number | undefined): string => {
	const str = value === undefined ? '' : String(value);
	return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

/**
 * Serializes the given skills into a pretty-printed JSON string. The
 * presentation-only fields (icons, home page visibility) are stripped
 * from the export.
 * @param {Skill[]} data - The skills to serialize.
 * @returns {string} The JSON representation.
 */
export const skillsToJson = (data: Skill[]): string => JSON.stringify(
	data.map((skill) => {
		const exportSkill = {
			...skill
		};
		delete exportSkill.icon;
		delete exportSkill.iconPrefix;
		delete exportSkill.isVisibleOnHome;
		return exportSkill;
	}),
	null,
	2
);

/**
 * Serializes the given skills into a CSV string (with a header row).
 * Skills are written in the given order, with a blank line inserted
 * between category groups.
 * @param {Skill[]} data - The skills to serialize.
 * @returns {string} The CSV representation.
 */
export const skillsToCsv = (data: Skill[]): string => {
	const header = CSV_COLUMNS.map(column => column.label).join(',');
	const lines = [header];
	data.forEach((skill, index) => {
		if (index > 0 && skill.category !== data[index - 1].category) {
			lines.push('');
		}
		lines.push(CSV_COLUMNS.map(column => escapeCsv(skill[column.key])).join(','));
	});
	return lines.join('\n');
};

/**
 * Triggers a client-side download of the given text content.
 * @param {string} filename - The suggested file name.
 * @param {string} content - The file content.
 * @param {string} mimeType - The MIME type of the content.
 */
export const downloadFile = (filename: string, content: string, mimeType: string): void => {
	const blob = new Blob([content], {
		type: mimeType
	});
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(url);
};
