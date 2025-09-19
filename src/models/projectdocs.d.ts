/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * Represents a project document.
 */
type ProjectDocs = {
	/**
	 * The id of the project.
	 */
	id: string;

	/**
	 * The fileName of the document.
	 */
	fileName: string;

	/**
	 * The fileExtension of the document.
	 */
	fileExtension: string;

	/**
	 * The hyperlink reference of the document.
	 */
	fileHref: string;
}
