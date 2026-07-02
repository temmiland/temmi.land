/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

const SkillCardContainer = styled.div`
	min-width: 0;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.08) 0%,
		rgba(255, 255, 255, 0.03) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.1);
	border-radius: 0.7vw;
	padding: 0.85vw 1.1vw;
	backdrop-filter: blur(0.7vw);
	--webkit-backdrop-filter: blur(0.7vw);
	transition: 120ms ease;

	@media (min-width: 320px) and (max-width: 600px) {
		border: 0.25vw solid rgba(255, 255, 255, 0.1);
		border-radius: 3.5vw;
		padding: 4vw 4.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		border: 0.125vw solid rgba(255, 255, 255, 0.1);
		border-radius: 1.8vw;
		padding: 1.8vw 2.2vw;
	}

	@media (min-width: 2000px) {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 14px;
		padding: 17px 22px;
	}

	&:hover {
		border-color: rgba(255, 255, 255, 0.28);
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.13) 0%,
			rgba(255, 255, 255, 0.05) 100%
		);
		transform: translateY(-0.15vw);
	}

	.skill-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6vw;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 2vw;
		}

		@media (min-width: 2000px) {
			gap: 12px;
		}
	}

	.skill-name {
		display: flex;
		align-items: center;
		gap: 0.55vw;
		flex: 1 1 auto;
		min-width: 0;
		overflow: hidden;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: #ffffff;
		font-size: 1.05vw;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 2.5vw;
			font-size: 4.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 1.2vw;
			font-size: 2.4vw;
		}

		@media (min-width: 2000px) {
			gap: 11px;
			font-size: 21px;
		}

		span {
			flex: 1 1 auto;
			min-width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		svg {
			color: #80cee1;
			font-size: 1.05vw;
			flex-shrink: 0;

			@media (min-width: 320px) and (max-width: 600px) {
				font-size: 4.5vw;
			}

			@media (min-width: 600px) and (max-width: 1024px) {
				font-size: 2.4vw;
			}

			@media (min-width: 2000px) {
				font-size: 21px;
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
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1vw;
		padding: 0.35vw 0.6vw;

		@media (min-width: 320px) and (max-width: 600px) {
			width: 24.4vw;
			border-radius: 4vw;
			padding: 1.4vw 2.2vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			width: 13.2vw;
			border-radius: 2vw;
			padding: 0.7vw 1.1vw;
		}

		@media (min-width: 2000px) {
			width: 118px;
			border-radius: 20px;
			padding: 6px 11px;
		}
	}

	.skill-details {
		display: flex;
		flex-direction: column;
		gap: 0.15vw;
		margin-top: 0.4vw;
		min-height: 3.4vw;

		@media (min-width: 320px) and (max-width: 600px) {
			gap: 0.8vw;
			margin-top: 2vw;
			min-height: 14vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			gap: 0.4vw;
			margin-top: 0.8vw;
			min-height: 7.6vw;
		}

		@media (min-width: 2000px) {
			gap: 3px;
			margin-top: 8px;
			min-height: 68px;
		}
	}

	.detail {
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-weight: 500;
		font-size: 0.85vw;
		color: rgba(255, 255, 255, 0.55);

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.4vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 1.9vw;
		}

		@media (min-width: 2000px) {
			font-size: 17px;
		}
	}

	.detail-version {
		color: rgba(255, 255, 255, 0.75);
	}
`;

const Stars = styled.div`
	display: inline-flex;
	gap: 0.2vw;

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 1vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 0.5vw;
	}

	@media (min-width: 2000px) {
		gap: 4px;
	}

	svg {
		font-size: 0.8vw;
		color: #f5a623;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.2vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 1.8vw;
		}

		@media (min-width: 2000px) {
			font-size: 16px;
		}
	}

	svg.empty {
		color: rgba(255, 255, 255, 0.18);
	}
`;

/**
 * Renders a row of 5 stars representing a skill rating.
 * @param {number} rating - The number of filled stars (1-5).
 * @returns {JSX.Element} The star rating element.
 */
const StarRating = ({ rating }: { rating: number }): JSX.Element => (
	<Stars>
		{ Array.from({
			length: 5
		}).map((_, i) => (
			<FontAwesomeIcon
				key={ i }
				className={ i < rating ? 'filled' : 'empty' }
				icon={ ['fas', 'star'] }
			/>
		)) }
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
		<div className={ 'skill-head' }>
			<div className={ 'skill-name' }>
				{ skill.icon ? (
					<FontAwesomeIcon
						icon={ [(skill.iconPrefix ?? 'fas') as IconPrefix, skill.icon as IconName] }
					/>
				) : null }
				<span title={ skill.name }>{ skill.name }</span>
			</div>
			{ skill.rating ? (
				<div className={ 'rating-box' }>
					<StarRating rating={ skill.rating } />
				</div>
			) : null }
		</div>
		<div className={ 'skill-details' }>
			{
				versionLine(skill) ? (
					<span className={ 'detail detail-version' }>{ versionLine(skill) }</span>
				) : null
			}
			<span className={ 'detail' }>
				{ skill.years === 1 ? 'Experience: 1 year' : `Experience: ${skill.years} years` }
			</span>
			<span className={ 'detail' }>{ `Last used: ${skill.lastUsed}` }</span>
		</div>
	</SkillCardContainer>
);
