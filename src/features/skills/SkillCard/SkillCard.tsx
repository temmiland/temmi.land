/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Skill } from '@/models/skill';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { colors, fluid, fluidRange, fonts, media, whiteAlpha } from '@/styles';

const SkillCardContainer = styled.div`
	min-width: 0;
	background: linear-gradient(135deg, ${whiteAlpha(0.08)} 0%, ${whiteAlpha(0.03)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.1)};
	border-radius: ${fluid(0.7)};
	padding: 0.85vw 1.1vw;
	backdrop-filter: blur(0.7vw);
	-webkit-backdrop-filter: blur(0.7vw);
	transition: 120ms ease;

	${media.mobile} {
		border: 0.25vw solid ${whiteAlpha(0.1)};
		border-radius: ${fluidRange(13.44, 15.59)};
		padding: ${fluidRange(15.69, 14.76)} ${fluidRange(17.42, 18.69)};
	}

	${media.tablet} {
		border: 0.125vw solid ${whiteAlpha(0.1)};
		border-radius: ${fluidRange(13.44, 15.59)};
		padding: ${fluidRange(15.69, 14.76)} ${fluidRange(17.42, 18.69)};
	}

	${media.wide} {
		border: 1px solid ${whiteAlpha(0.1)};
		padding: 17px 22px;
	}

	&:hover {
		border-color: ${whiteAlpha(0.28)};
		background: linear-gradient(135deg, ${whiteAlpha(0.13)} 0%, ${whiteAlpha(0.05)} 100%);
		transform: translateY(-0.15vw);
	}

	.skill-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: ${fluid(0.6)};

		${media.mobile} {
			gap: 2vw;
		}
	}

	.skill-name {
		display: flex;
		align-items: center;
		gap: ${fluid(0.55)};
		flex: 1 1 auto;
		min-width: 0;
		overflow: hidden;
		font-family: ${fonts.medium};
		color: ${colors.white};
		font-size: ${fluid(1.05)};

		${media.belowDesktop} {
			gap: ${fluidRange(9.71, 10.12)};
			font-size: ${fluidRange(17.16, 21.07)};
		}

		span {
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		svg {
			color: ${colors.accentBlue};
			font-size: ${fluid(1.05)};
			flex-shrink: 0;

			${media.belowDesktop} {
				font-size: ${fluidRange(17.16, 21.07)};
			}
		}
	}

	.rating-box {
		flex-shrink: 0;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 6vw;
		background: ${whiteAlpha(0.1)};
		border-radius: ${fluid(1)};
		padding: 0.35vw 0.6vw;

		${media.belowDesktop} {
			width: ${fluidRange(92.81, 116.48)};
			border-radius: ${fluidRange(15.43, 17.14)};
			padding: ${fluidRange(5.4, 6)} ${fluidRange(8.49, 9.43)};
		}

		${media.wide} {
			width: 118px;
			padding: 6px 11px;
		}
	}

	.skill-details {
		display: flex;
		flex-direction: column;
		gap: ${fluid(0.15)};
		margin-top: ${fluid(0.4)};
		min-height: ${fluid(3.4)};

		${media.belowDesktop} {
			gap: ${fluidRange(3.09, 3.43)};
			margin-top: ${fluidRange(7.98, 6.19)};
			min-height: ${fluidRange(53.22, 67.14)};
		}
	}

	.detail {
		font-family: ${fonts.medium};
		font-weight: 500;
		font-size: ${fluid(0.85)};
		color: ${whiteAlpha(0.55)};

		${media.belowDesktop} {
			font-size: ${fluidRange(12.85, 16.95)};
		}
	}

	.detail-version {
		color: ${whiteAlpha(0.75)};
	}
`;

const Stars = styled.div`
	display: inline-flex;
	gap: ${fluid(0.2)};

	${media.belowDesktop} {
		gap: ${fluidRange(3.86, 4.29)};
	}

	svg {
		font-size: ${fluid(0.8)};
		color: #f5a623;

		${media.belowDesktop} {
			font-size: ${fluidRange(12.08, 16.1)};
		}
	}

	svg.empty {
		color: ${whiteAlpha(0.18)};
	}
`;

/**
 * Renders a row of 5 stars representing a skill rating.
 * @param {number} rating - The number of filled stars (1-5).
 * @returns {JSX.Element} The star rating element.
 */
const StarRating = ({ rating }: { rating: number }): JSX.Element => (
	<Stars>
		{Array.from({
			length: 5
		}).map((_, i) => (
			<FontAwesomeIcon key={i} className={i < rating ? 'filled' : 'empty'} icon={['fas', 'star']} />
		))}
	</Stars>
);

/**
 * Props for a skill card.
 */
type SkillCardProps = {
	/** The skill to render. */
	skill: Skill;
};

/**
 * Builds the version/description line for a skill: "Last used version: X
 * (description)" when both are set, just the description when there is no
 * version, or nothing at all.
 * @param {Skill} skill - The skill to build the line for.
 * @returns {string} The version/description line, or an empty string.
 */
const versionLine = (skill: Skill): string => {
	if (skill.version) {
		return skill.description
			? `Last used version: ${skill.version} (${skill.description})`
			: `Last used version: ${skill.version}`;
	}
	return skill.description ?? '';
};

/**
 * SkillCard component. Renders a single skill as a dark-glass card with its
 * icon, name, star rating and detail notes (version/description, years of
 * experience, last used).
 * @param {SkillCardProps} props - The props for the SkillCard component.
 * @returns {JSX.Element} SkillCard JSX element.
 */
export const SkillCard = ({ skill }: SkillCardProps): JSX.Element => (
	<SkillCardContainer>
		<div className={'skill-head'}>
			<div className={'skill-name'}>
				{skill.icon ? (
					<FontAwesomeIcon
						icon={[(skill.iconPrefix ?? 'fas') as IconPrefix, skill.icon as IconName]}
					/>
				) : null}
				<span title={skill.name}>{skill.name}</span>
			</div>
			{skill.rating ? (
				<div className={'rating-box'}>
					<StarRating rating={skill.rating} />
				</div>
			) : null}
		</div>
		<div className={'skill-details'}>
			{versionLine(skill) ? (
				<span className={'detail detail-version'}>{versionLine(skill)}</span>
			) : null}
			<span className={'detail'}>
				{skill.years === 1 ? 'Experience: 1 year' : `Experience: ${skill.years} years`}
			</span>
			<span className={'detail'}>{`Last used: ${skill.lastUsed}`}</span>
		</div>
	</SkillCardContainer>
);
