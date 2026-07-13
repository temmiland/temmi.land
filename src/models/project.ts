/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { ProjectStatus } from './projectstatus';
import { ProjectDocs } from './projectdocs';

/**
 * Represents a project.
 */
export type Project = {
	/**
	 * The id of the project.
	 */
	id: string;

	/**
	 * The name of the project.
	 */
	name: string;

	/**
	 * The status of the project.
	 */
	status: ProjectStatus;

	/**
	 * The description of the project.
	 */
	description: string;

	/**
	 * The long description of the project.
	 */
	longDescription: string;

	/**
	 * The hyperlink reference for the project page.
	 */
	href: string;

	/**
	 * The project will be shown on the Home page.
	 */
	isVisibleOnHome?: boolean;

	/**
	 * The gradient used for the tile.
	 */
	tileGradient: string;

	/**
	 * The icon representing the project.
	 */
	tileIcon: string;

	/**
	 * The host for the projects repository.
	 */
	repoHost: string;

	/**
	 * The icon for the projects repository host.
	 */
	repoIcon: string;

	/**
	 * The hyperlink reference for the projects repository.
	 */
	repoHref: string;

	/**
	 * The license the project is under.
	 */
	license: string;

	/**
	 * The hyperlink reference for a projects license.
	 */
	licenseHref: string;

	/**
	 * Additional reference links for the project (e.g. demo, articles, docs).
	 */
	links: {
		/**
		 * The FontAwesome icon name.
		 */
		icon: string;

		/**
		 * The FontAwesome icon prefix. Defaults to 'fas' (solid icons).
		 */
		iconPrefix?: string;

		/**
		 * The display label for the link.
		 */
		host: string;

		/**
		 * The hyperlink reference.
		 */
		href: string;
	}[];

	/**
	 * The techstack used in the project.
	 */
	techStack: string[];

	/**
	 * The docs used in the project.
	 */
	docs: ProjectDocs['id'][];
};
