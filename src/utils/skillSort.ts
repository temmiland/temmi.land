/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Skill } from '@/models/skill';
import { SkillCategory } from '@/models/skillcategory';

const CATEGORY_ORDER = Object.values(SkillCategory);

/**
 * The ways a list of skills can be ordered.
 */
export type SkillSortOption = 'rating' | 'experience' | 'lastUsed' | 'name';

/**
 * The default sort applied to skill lists: highest rating first, ties
 * broken by years of experience.
 */
export const DEFAULT_SKILL_SORT: SkillSortOption = 'rating';

/**
 * Human-readable labels for each sort option.
 */
export const SKILL_SORT_LABELS: Record<SkillSortOption, string> = {
	rating: 'Rating',
	experience: 'Experience',
	lastUsed: 'Last used',
	name: 'Name (A–Z)'
};

/**
 * Compares two skills according to the given sort option.
 * @param {SkillSortOption} option - The sort option to compare by.
 * @param {Skill} a - The first skill.
 * @param {Skill} b - The second skill.
 * @returns {number} A negative, zero or positive comparison result.
 */
const compareSkills = (option: SkillSortOption, a: Skill, b: Skill): number => {
	switch (option) {
		case 'experience':
			return b.years - a.years || (b.rating ?? 0) - (a.rating ?? 0);
		case 'lastUsed':
			return b.lastUsed - a.lastUsed || (b.rating ?? 0) - (a.rating ?? 0);
		case 'name':
			return a.name.localeCompare(b.name);
		case 'rating':
		default:
			return (b.rating ?? 0) - (a.rating ?? 0) || b.years - a.years;
	}
};

/**
 * Returns a new array of skills sorted according to the given sort option.
 * @param {Skill[]} skillList - The skills to sort.
 * @param {SkillSortOption} option - The sort option to apply.
 * @returns {Skill[]} The sorted skills (does not mutate the input).
 */
export const sortSkills = (skillList: Skill[], option: SkillSortOption = DEFAULT_SKILL_SORT): Skill[] =>
	[...skillList].sort((a, b) => compareSkills(option, a, b));

/**
 * Sorts skills the way the Home page overview shows them: by category (in
 * the SkillCategory enum's declared order), then by rating within each
 * category, highest first.
 * @param {Skill[]} skillList - The skills to sort.
 * @returns {Skill[]} The sorted skills (does not mutate the input).
 */
export const sortSkillsForHome = (skillList: Skill[]): Skill[] =>
	[...skillList].sort(
		(a, b) =>
			CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
			compareSkills('rating', a, b)
	);
