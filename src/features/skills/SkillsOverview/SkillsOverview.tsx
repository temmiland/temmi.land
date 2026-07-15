/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkillCard from '@/features/skills/SkillCard';
import { Link } from '@/ui/Link/Link';
import { Skill } from '@/models/skill';
import { sortSkillsForHome } from '@/utils/skillSort';
import { colors, fluid, fonts, media, whiteAlpha } from '@/styles';

const SkillsWrapper = styled.div`
	display: grid;
	position: relative;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 0.9vw;
	grid-row-gap: 0.9vw;

	${media.mobile} {
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 3vw;
		grid-row-gap: 3vw;
	}

	${media.tablet} {
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 1.125vw;
		grid-row-gap: 1.125vw;
	}

	${media.wide} {
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
 * it falls back into the grid as a slim full-width row (with an "All
 * skills" label) spanning all columns below the skill cards - matching
 * the more-tile row used in the Blog overview exactly.
 */
const MoreLink = styled(Link)`
	display: block;
	position: absolute;
	grid-column: 5;
	top: 0;
	bottom: 0;
	left: ${fluid(0.9)};
	width: 18.825vw;

	${media.belowDesktop} {
		position: static;
		grid-column: 1 / -1;
		width: auto;
	}

	${media.wide} {
		left: 14px;
		width: 744px;
	}
`;

const MoreCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	padding-left: 1.5vw;
	border: 0.07vw dashed ${whiteAlpha(0.3)};
	border-radius: ${fluid(0.7)};
	color: ${colors.white};
	transition: 120ms ease;

	${media.belowDesktop} {
		justify-content: center;
		height: auto;
		gap: ${fluid(1)};
		padding: ${fluid(1.4)} 0;
		border-radius: ${fluid(1.1)};
		font-family: ${fonts.medium};
		font-size: ${fluid(1.1)};
	}

	${media.mobile} {
		gap: 3vw;
		padding: 5vw 0;
		border: 0.25vw dashed ${whiteAlpha(0.3)};
		border-radius: 5vw;
		font-size: 4.5vw;
	}

	${media.tablet} {
		gap: 1.5vw;
		padding: 2.25vw 0;
		border: 0.125vw dashed ${whiteAlpha(0.3)};
		border-radius: 1.95vw;
		font-size: 1.95vw;
	}

	${media.wide} {
		border-width: 1px;
		padding-left: 0;
	}

	&:hover {
		border-color: ${whiteAlpha(0.6)};
		background: ${whiteAlpha(0.05)};
	}

	.more-label {
		display: none;

		${media.belowDesktop} {
			display: inline;
		}
	}

	svg {
		color: ${colors.white};
		font-size: ${fluid(4.7)};

		${media.belowDesktop} {
			color: ${colors.accentBlue};
			font-size: ${fluid(1.4)};
		}

		${media.mobile} {
			font-size: 6vw;
		}

		${media.tablet} {
			font-size: 2.55vw;
		}

		${media.wide} {
			margin-left: 75px;
		}
	}
`;

const MAX_SKILL_CARDS = 12;

/**
 * SkillsOverview component. Renders the skills flagged for the Home page as a
 * compact grid of cards plus a link to the full skills page.
 * @returns {JSX.Element} SkillsOverview JSX element.
 */
/**
 * Props for the skills overview.
 */
type SkillsOverviewProps = {
	/** The skills to pick the home page selection from. */
	skills: Skill[];
};

export const SkillsOverview = ({ skills }: SkillsOverviewProps): JSX.Element => {
	const shownSkills = sortSkillsForHome(skills.filter((skill) => skill.isVisibleOnHome)).slice(
		0,
		MAX_SKILL_CARDS
	);

	return (
		<SkillsWrapper>
			{shownSkills.map((skill) => (
				<SkillCard key={skill.id} skill={skill} />
			))}
			<MoreLink href={'/skills'}>
				<MoreCard>
					<span className={'more-label'}>{'All skills'}</span>
					<FontAwesomeIcon icon={'caret-right'} />
				</MoreCard>
			</MoreLink>
		</SkillsWrapper>
	);
};
