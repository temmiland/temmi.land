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
import { colors, fluid, fonts, media, whiteAlpha } from '@/styles';

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
		border-radius: 3.5vw;
		padding: 4vw 4.5vw;
	}

	${media.tablet} {
		border: 0.125vw solid ${whiteAlpha(0.1)};
		border-radius: 1.35vw;
		padding: 1.35vw 1.65vw;
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

		${media.mobile} {
			gap: 2.5vw;
			font-size: 4.5vw;
		}

		${media.tablet} {
			gap: 0.9vw;
			font-size: 1.8vw;
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

			${media.mobile} {
				font-size: 4.5vw;
			}

			${media.tablet} {
				font-size: 1.8vw;
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

		${media.mobile} {
			width: 24.4vw;
			border-radius: 4vw;
			padding: 1.4vw 2.2vw;
		}

		${media.tablet} {
			width: 13.2vw;
			border-radius: 1.5vw;
			padding: 0.525vw 0.825vw;
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

		${media.mobile} {
			gap: 0.8vw;
			margin-top: 2vw;
			min-height: 14vw;
		}

		${media.tablet} {
			gap: 0.3vw;
			margin-top: 0.6vw;
			min-height: 5.7vw;
		}
	}

	.detail {
		font-family: ${fonts.medium};
		font-weight: 500;
		font-size: ${fluid(0.85)};
		color: ${whiteAlpha(0.55)};

		${media.mobile} {
			font-size: 3.4vw;
		}

		${media.tablet} {
			font-size: 1.425vw;
		}
	}

	.detail-version {
		color: ${whiteAlpha(0.75)};
	}
`;

const Stars = styled.div`
	display: inline-flex;
	gap: ${fluid(0.2)};

	${media.mobile} {
		gap: 1vw;
	}

	${media.tablet} {
		gap: 0.375vw;
	}

	svg {
		font-size: ${fluid(0.8)};
		color: #f5a623;

		${media.mobile} {
			font-size: 3.2vw;
		}

		${media.tablet} {
			font-size: 1.35vw;
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
