/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { describe, expect, it } from 'vitest';
import { Skill } from '@/models/skill';
import { SkillCategory } from '@/models/skillcategory';
import { skillsToCsv, skillsToJson } from './skillExport';

const skill = (overrides: Partial<Skill> & Pick<Skill, 'id' | 'name'>): Skill => ({
	category: SkillCategory.TOOLS,
	years: 3,
	lastUsed: 2026,
	...overrides
});

describe('skillsToCsv', () => {
	it('writes a header row followed by one row per skill', () => {
		const csv = skillsToCsv([
			skill({
				id: 'a', name: 'TypeScript', rating: 5
			})
		]);
		const lines = csv.split('\n');

		expect(lines[0]).toBe(
			'Skill,Category,Rating (1-5),Experience in Years,Last used,Version,Description'
		);
		expect(lines[1]).toBe('TypeScript,Tools,5,3,2026,,');
	});

	it('inserts a blank line between category groups', () => {
		const csv = skillsToCsv([
			skill({
				id: 'a', name: 'A', category: SkillCategory.TOOLS
			}),
			skill({
				id: 'b', name: 'B', category: SkillCategory.AI
			})
		]);

		expect(csv.split('\n')).toEqual([
			'Skill,Category,Rating (1-5),Experience in Years,Last used,Version,Description',
			'A,Tools,,3,2026,,',
			'',
			'B,AI,,3,2026,,'
		]);
	});

	it('does not insert a blank line between consecutive skills in the same category', () => {
		const csv = skillsToCsv([
			skill({
				id: 'a', name: 'A'
			}),
			skill({
				id: 'b', name: 'B'
			})
		]);

		expect(csv.split('\n')).toHaveLength(3);
	});

	it('quotes cells containing a comma', () => {
		const csv = skillsToCsv([
			skill({
				id: 'a', name: 'A', description: 'Foo, Bar'
			})
		]);

		expect(csv).toContain('"Foo, Bar"');
	});

	it('escapes embedded quotes by doubling them', () => {
		const csv = skillsToCsv([
			skill({
				id: 'a', name: 'A', description: 'Say "hi"'
			})
		]);

		expect(csv).toContain('"Say ""hi"""');
	});

	it('prefixes leading =, +, -, @ with a single quote to prevent CSV formula injection', () => {
		for (const dangerous of ['=SUM(A1)', '+1', '-1', '@cmd']) {
			const csv = skillsToCsv([
				skill({
					id: 'a', name: 'A', description: dangerous
				})
			]);
			const lastCell = csv.split('\n')[1].split(',').pop();

			expect(lastCell).toBe(`'${dangerous}`);
		}
	});
});

describe('skillsToJson', () => {
	it('strips presentation-only fields', () => {
		const json = skillsToJson([
			skill({
				id: 'a', name: 'A', icon: 'react', iconPrefix: 'fab', isVisibleOnHome: true
			})
		]);
		const parsed = JSON.parse(json);

		expect(parsed[0]).not.toHaveProperty('icon');
		expect(parsed[0]).not.toHaveProperty('iconPrefix');
		expect(parsed[0]).not.toHaveProperty('isVisibleOnHome');
		expect(parsed[0].name).toBe('A');
	});
});
