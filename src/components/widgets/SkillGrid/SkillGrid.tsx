/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../components/util/Typography';
import SkillCard from '../../components/skill/SkillCard';
import { skills } from '../../../data/skills';
import { SkillCategory } from '../../../models/skillcategory.d';
import { DEFAULT_SKILL_SORT, sortSkills, SkillSortOption } from '../../../utils/skillSort';

const SkillGridContainer = styled.div`
	padding: 0 6.5vw 3vw 6.5vw;
	max-width: 1545px;

	@media (min-width: 2000px) {
		min-width: 1600px;
	}
`;

const NoResults = styled.div`
	margin: 3vw 0;

	@media (min-width: 2000px) {
		margin: 40px 0;
	}
`;

const CategoryBlock = styled.div`
	margin: 2vw 0 0.5vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 7vw 0 2vw 0;
	}

	@media (min-width: 2000px) {
		margin: 40px 0 10px 0;
	}
`;

const SkillCardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 0.9vw;
	grid-row-gap: 0.9vw;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 3vw;
		grid-row-gap: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 1.5vw;
		grid-row-gap: 1.5vw;
	}

	@media (min-width: 2000px) {
		grid-column-gap: 14px;
		grid-row-gap: 14px;
	}
`;

/**
 * Props for the skill grid.
 */
type SkillGridProps = {
	/** The category to filter by, or '' for no filter. */
	categoryToMatch?: string
	/** The order skills are sorted in within each category. */
	sortBy?: SkillSortOption
	/** The search query to filter skill names by, or '' for no filter. */
	searchQuery?: string
}

/**
 * SkillGrid component. Renders all skills grouped by their category, sorted
 * within each category by the given sort option.
 * @param {SkillGridProps} props - The props for the SkillGrid component.
 * @returns {JSX.Element} SkillGrid JSX element.
 */
export const SkillGrid = (
	{ categoryToMatch = '', sortBy = DEFAULT_SKILL_SORT, searchQuery = '' }: SkillGridProps
): JSX.Element => {

	const normalizedQuery = searchQuery.trim().toLowerCase();

	const filteredSkills = skills
		.filter(skill => !categoryToMatch || skill.category === categoryToMatch)
		.filter(skill => !normalizedQuery || skill.name.toLowerCase().includes(normalizedQuery));

	const categories = Object.values(SkillCategory)
		.filter(category => filteredSkills.some(skill => skill.category === category));

	if (categories.length === 0) {
		return (
			<SkillGridContainer>
				<NoResults>
					<Typography variant={ 'p' }>
						{ 'No skills found.' }
					</Typography>
				</NoResults>
			</SkillGridContainer>
		);
	}

	return (
		<SkillGridContainer>
			{
				categories.map(category => (
					<CategoryBlock key={ category }>
						<Typography variant={ 'h4' }>
							{ category }
						</Typography>
						<SkillCardGrid>
							{
								sortSkills(
									filteredSkills.filter(skill => skill.category === category),
									sortBy
								).map(skill => (
									<SkillCard key={ skill.id } skill={ skill } />
								))
							}
						</SkillCardGrid>
					</CategoryBlock>
				))
			}
		</SkillGridContainer>
	);
}
