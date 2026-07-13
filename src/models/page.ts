/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * Represents a page for the header.
 */
export type Page = {
	/**
	 * The name of the page.
	 */
	name: string;

	/**
	 * The hyperlink reference for the project page.
	 */
	href: string;

	/**
	 * The id of the Home page section this entry scrolls to while already on
	 * the Home page. Only needed when it can't be derived from `href` (i.e.
	 * `href` isn't a `/#id` anchor), such as pages that also have their own
	 * dedicated route.
	 */
	sectionId?: string;
};
