/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { SkillCategory } from './skillcategory';

/**
 * Represents a single skill (a programming language, database,
 * tool, framework, …) the way it is rendered on the skills page.
 */
export type Skill = {
	/**
	 * The id of the skill.
	 */
	id: string;

	/**
	 * The display name of the skill.
	 */
	name: string;

	/**
	 * The category the skill belongs to.
	 */
	category: SkillCategory;

	/**
	 * The self-assessed proficiency from 1 to 5 stars.
	 */
	rating?: 1 | 2 | 3 | 4 | 5;

	/**
	 * The amount of years of experience with the skill.
	 */
	years: number;

	/**
	 * The year the skill was last actively used.
	 */
	lastUsed: number;

	/**
	 * The skill will be shown in the overview on the Home page.
	 */
	isVisibleOnHome?: boolean;

	/**
	 * The version of the skill that is mainly used, or a proficiency level
	 * (optional).
	 */
	version?: string;

	/**
	 * A short free-text annotation shown alongside the version, or on its
	 * own if there is no version (optional).
	 */
	description?: string;

	/**
	 * The FontAwesome icon name representing the skill (optional).
	 */
	icon?: string;

	/**
	 * The FontAwesome icon style prefix (defaults to 'fas').
	 */
	iconPrefix?: 'fas' | 'fab' | 'far';
};
