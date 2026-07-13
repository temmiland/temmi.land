/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { describe, expect, it } from 'vitest';
import { Skill } from '@/models/skill';
import { SkillCategory } from '@/models/skillcategory';
import { sortSkills, sortSkillsForHome } from './skillSort';

const skill = (overrides: Partial<Skill> & Pick<Skill, 'id' | 'name'>): Skill => ({
	category: SkillCategory.TOOLS,
	years: 0,
	lastUsed: 2020,
	...overrides
});

describe('sortSkills', () => {
	it('sorts by rating descending, ties broken by years', () => {
		const skills = [
			skill({
				id: 'a', name: 'A', rating: 3, years: 5
			}),
			skill({
				id: 'b', name: 'B', rating: 5, years: 1
			}),
			skill({
				id: 'c', name: 'C', rating: 3, years: 8
			})
		];

		expect(sortSkills(skills, 'rating').map((s) => s.id)).toEqual(['b', 'c', 'a']);
	});

	it('treats a missing rating as 0', () => {
		const skills = [
			skill({
				id: 'a', name: 'A', rating: 1
			}),
			skill({
				id: 'b', name: 'B'
			})
		];

		expect(sortSkills(skills, 'rating').map((s) => s.id)).toEqual(['a', 'b']);
	});

	it('sorts by years descending for "experience"', () => {
		const skills = [
			skill({
				id: 'a', name: 'A', years: 2
			}),
			skill({
				id: 'b', name: 'B', years: 9
			})
		];

		expect(sortSkills(skills, 'experience').map((s) => s.id)).toEqual(['b', 'a']);
	});

	it('sorts by lastUsed descending for "lastUsed"', () => {
		const skills = [
			skill({
				id: 'a', name: 'A', lastUsed: 2019
			}),
			skill({
				id: 'b', name: 'B', lastUsed: 2026
			})
		];

		expect(sortSkills(skills, 'lastUsed').map((s) => s.id)).toEqual(['b', 'a']);
	});

	it('sorts alphabetically for "name"', () => {
		const skills = [
			skill({
				id: 'a', name: 'Zig'
			}),
			skill({
				id: 'b', name: 'Ada'
			})
		];

		expect(sortSkills(skills, 'name').map((s) => s.id)).toEqual(['b', 'a']);
	});

	it('does not mutate the input array', () => {
		const skills = [
			skill({
				id: 'a', name: 'A', rating: 1
			}),
			skill({
				id: 'b', name: 'B', rating: 5
			})
		];
		const original = [...skills];

		sortSkills(skills, 'rating');

		expect(skills).toEqual(original);
	});
});

describe('sortSkillsForHome', () => {
	it('groups by category in SkillCategory declaration order, then by rating within each group', () => {
		const skills = [
			skill({
				id: 'backend-low', name: 'Backend Low', category: SkillCategory.BACKEND, rating: 2
			}),
			skill({
				id: 'lang-high', name: 'Lang High', category: SkillCategory.PROGRAMMING_LANGUAGES, rating: 3
			}),
			skill({
				id: 'backend-high', name: 'Backend High', category: SkillCategory.BACKEND, rating: 5
			})
		];

		// PROGRAMMING_LANGUAGES comes before BACKEND in the enum's declaration
		// order, and within BACKEND the higher rating should sort first.
		expect(sortSkillsForHome(skills).map((s) => s.id)).toEqual([
			'lang-high', 'backend-high', 'backend-low'
		]);
	});
});
