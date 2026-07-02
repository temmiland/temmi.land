/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkillCard from '../../components/skill/SkillCard';
import { Link } from '../../components/util/Link/Link';
import { skills } from '../../../data/skills';
import { sortSkillsForHome } from '../../../utils/skillSort';

const SkillsWrapper = styled.div`
	display: grid;
	position: relative;
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

/*
 * On desktop the more card is appended behind the grid area like the
 * MoreTile in Projects: absolutely positioned one gap right of the grid,
 * overflowing into the page margin. It spans the full grid height (all
 * skill rows) and is exactly one grid column wide (i.e. (content width -
 * 3 gaps) / 4, the width of a skill card) — without affecting the
 * in-flow skill cards. On tablet and phone there is no margin space, so
 * it falls back into the grid as a slim full-width row spanning all
 * columns below the skill cards.
 */
const MoreLink = styled(Link)`
	display: block;
	position: absolute;
	grid-column: 5;
	top: 0;
	bottom: 0;
	left: 0.9vw;
	width: 18.825vw;

	@media (min-width: 320px) and (max-width: 1024px) {
		position: static;
		grid-column: 1 / -1;
		grid-row: auto;
		width: auto;
	}

	@media (min-width: 2000px) {
		left: 14px;
		width: 369.5px;
	}
`;

const MoreCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding-left: 1.5vw;
	width: 100%;
	height: 100%;
	border: 0.07vw dashed rgba(255, 255, 255, 0.3);
	border-radius: 0.7vw;
	color: #ffffff;
	transition: 120ms ease;

	@media (min-width: 320px) and (max-width: 600px) {
		justify-content: center;
		height: auto;
		padding: 2vw 0;
		border: 0.25vw dashed rgba(255, 255, 255, 0.3);
		border-radius: 3.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		justify-content: center;
		height: auto;
		padding: 1vw 0;
		border: 0.125vw dashed rgba(255, 255, 255, 0.3);
		border-radius: 1.8vw;
	}

	@media (min-width: 2000px) {
		border: 1px dashed rgba(255, 255, 255, 0.3);
		border-radius: 14px;
		padding-left: 22px;
	}

	&:hover {
		border-color: rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.05);
	}

	svg {
		color: #80cee1;
		font-size: 3vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 19.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 10.5vw;
		}

		@media (min-width: 2000px) {
			font-size: 60px;
		}
	}
`;

const MAX_SKILL_CARDS = 12;

/**
 * SkillsOverview component. Renders the skills flagged for the Home page as a
 * compact grid of cards plus a link to the full skills page.
 * @returns {JSX.Element} SkillsOverview JSX element.
 */
export const SkillsOverview = (): JSX.Element => {

	const shownSkills = sortSkillsForHome(skills.filter((skill) => skill.isVisibleOnHome))
		.slice(0, MAX_SKILL_CARDS);

	return (
		<SkillsWrapper>
			{
				shownSkills.map((skill) => (
					<SkillCard key={ skill.id } skill={ skill } />
				))
			}
			<MoreLink href={ '/skills' }>
				<MoreCard>
					<FontAwesomeIcon icon={ 'caret-right' } />
				</MoreCard>
			</MoreLink>
		</SkillsWrapper>
	);
};
