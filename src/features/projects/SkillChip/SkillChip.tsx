/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Typography from '@/ui/Typography';
import { Skill } from '@/models/skill';
import SkillCard from '@/features/skills/SkillCard';
import { skills } from '@/data/skills';
import { colors, fluid, fonts, media, whiteAlpha } from '@/styles';

/**
 * Lookup of skills by their (lower-cased) name, so a tech-stack label on a
 * project can be resolved back to its full skill entry.
 */
const skillsByName = new Map<string, Skill>(skills.map((skill) => [skill.name.toLowerCase(), skill]));

const Wrapper = styled.div`
	position: relative;
	display: inline-flex;
	isolation: isolate;

	.skill-card-tooltip {
		position: absolute;
		bottom: calc(100% + 1vw);
		left: 50%;
		transform: translateX(-50%) translateY(0.4vw);
		width: 22vw;
		background: ${colors.surface};
		border-radius: ${fluid(0.7)};
		overflow: hidden;
		box-shadow: 0 0.6vw 1.8vw rgba(0, 0, 0, 0.55);
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition:
			opacity 120ms ease,
			transform 120ms ease;
		isolation: isolate;
		z-index: 30;

		${media.mobile} {
			width: 74vw;
			bottom: calc(100% + 3vw);
			border-radius: 3.5vw;
			box-shadow: 0 2vw 6vw rgba(0, 0, 0, 0.55);
		}

		${media.tablet} {
			width: 46vw;
			bottom: calc(100% + 2vw);
			border-radius: 1.35vw;
			box-shadow: 0 0.9vw 2.7vw rgba(0, 0, 0, 0.55);
		}

		${media.wide} {
			width: 320px;
			bottom: calc(100% + 10px);
			box-shadow: 0 12px 36px rgba(0, 0, 0, 0.55);
		}

		/*
		 * SkillCard is a frosted-glass surface designed for the busy Skills
		 * page background. Here it sits alone on a plain dark tooltip, so its
		 * own translucency + backdrop-filter is redundant and, depending on
		 * the browser's border-radius/backdrop-filter compositing, can let a
		 * faint ring of whatever sits behind the tooltip bleed through at the
		 * rounded edge. Force it fully solid instead of relying on layering.
		 */
		& > div {
			background: #1c1c1c !important;
			border-color: ${whiteAlpha(0.14)} !important;
			backdrop-filter: none !important;
			-webkit-backdrop-filter: none !important;
		}
	}

	&:hover .skill-card-tooltip {
		opacity: 1;
		visibility: visible;
		transform: translateX(-50%) translateY(0);
	}
`;

const chipStyles = css<{ $linked: boolean }>`
	position: relative;
	isolation: isolate;
	min-height: 2.4vw;
	max-width: 100%;
	box-sizing: border-box;
	border-radius: 1.5vw;
	background: linear-gradient(135deg, ${whiteAlpha(0.75)} 0%, ${whiteAlpha(0.55)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.7)};
	backdrop-filter: blur(0.6vw);
	-webkit-backdrop-filter: blur(0.6vw);
	text-align: center;
	padding: 0 0.69vw;
	margin: 0.14vw 0.347vw 0.14vw 0;
	font-size: 1.17vw;
	text-decoration: none;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: ${(props: { $linked: boolean }) => (props.$linked ? 'pointer' : 'default')};
	transition:
		background 120ms ease,
		border-color 120ms ease,
		transform 120ms ease;

	${(props: { $linked: boolean }) =>
		props.$linked
			? `
			&:hover {
				background: linear-gradient(
					135deg,
					${whiteAlpha(0.9)} 0%,
					${whiteAlpha(0.7)} 100%
				);
				border-color: ${whiteAlpha(0.9)};
				transform: translateY(-0.1vw);
			}
		`
			: ''}

	${media.mobile} {
		border-width: 0.25vw;
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	${media.tablet} {
		border-width: 0.094vw;
		backdrop-filter: blur(0.9vw);
		-webkit-backdrop-filter: blur(0.9vw);
	}

	${media.wide} {
		border-width: 1px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	${media.mobile} {
		min-height: 5.75vw;
		border-radius: 5vw;
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 1vw;
		font-size: 3vw;
	}

	${media.tablet} {
		min-height: 3.188vw;
		border-radius: 1.875vw;
		padding: 0.3vw 0.562vw 0.3vw 0.562vw;
		margin: 0.375vw;
		font-size: 1.5vw;
	}

	${media.wide} {
		border-radius: 30px;
		padding: 0 14px;
		margin: 3px 7px 3px 0;
		min-height: 48px;
		font-size: 24px;
	}

	p {
		margin: 0.14vw 0.347vw;
		display: inline-block;
		font-family: ${fonts.medium};
		color: ${colors.ink};
		overflow-wrap: break-word;
		word-break: break-word;

		${media.mobile} {
			margin: 1vw 0.69vw 0 0.75vw;
		}

		${media.tablet} {
			margin: 0.375vw 0.517vw 0 0.562vw;
		}

		${media.wide} {
			margin: 3px 7px;
		}
	}
`;

const ChipAnchor = styled.a<{ $linked: boolean }>`
	${chipStyles}
`;
const ChipRouterLink = styled(Link)<{ $linked: boolean }>`
	${chipStyles}
`;

/**
 * Props for a skill chip.
 */
type SkillChipProps = {
	/** The tech-stack label to render. */
	tech: string;
};

/**
 * SkillChip component. Renders a single tech-stack label as a pill. When the
 * label matches a known skill it becomes a link to the skills page (pre-filtered
 * to that skill) and reveals the full SkillCard on hover.
 * @param {SkillChipProps} props - The props for the SkillChip component.
 * @returns {JSX.Element} SkillChip JSX element.
 */
export const SkillChip = ({ tech }: SkillChipProps): JSX.Element => {
	const skill = skillsByName.get(tech.toLowerCase());

	return (
		<Wrapper>
			{skill ? (
				<ChipRouterLink $linked to={`/skills?search=${encodeURIComponent(skill.name)}`}>
					<Typography variant={'project_desc'}>{tech}</Typography>
				</ChipRouterLink>
			) : (
				<ChipAnchor $linked={false}>
					<Typography variant={'project_desc'}>{tech}</Typography>
				</ChipAnchor>
			)}
			{skill ? (
				<div className={'skill-card-tooltip'}>
					<SkillCard skill={skill} />
				</div>
			) : null}
		</Wrapper>
	);
};
