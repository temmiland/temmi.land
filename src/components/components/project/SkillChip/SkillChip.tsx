/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../util/Typography';
import SkillCard from '../../skill/SkillCard';
import { skills } from '../../../../data/skills';

/**
 * Lookup of skills by their (lower-cased) name, so a tech-stack label on a
 * project can be resolved back to its full skill entry.
 */
const skillsByName = new Map<string, Skill>(
	skills.map((skill) => [skill.name.toLowerCase(), skill])
);

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
		background: #141414;
		border-radius: 0.7vw;
		overflow: hidden;
		box-shadow: 0 0.6vw 1.8vw rgba(0, 0, 0, 0.55);
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition: opacity 120ms ease, transform 120ms ease;
		isolation: isolate;
		z-index: 30;

		@media (min-width: 320px) and (max-width: 600px) {
			width: 74vw;
			bottom: calc(100% + 3vw);
			border-radius: 3.5vw;
			box-shadow: 0 2vw 6vw rgba(0, 0, 0, 0.55);
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			width: 46vw;
			bottom: calc(100% + 2vw);
			border-radius: 1.8vw;
			box-shadow: 0 1.2vw 3.6vw rgba(0, 0, 0, 0.55);
		}

		@media (min-width: 2000px) {
			width: 320px;
			bottom: calc(100% + 10px);
			border-radius: 14px;
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
			border-color: rgba(255, 255, 255, 0.14) !important;
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

const Chip = styled.a<{ $linked: boolean }>`
	position: relative;
	isolation: isolate;
	min-height: 2.4vw;
	max-width: 100%;
	box-sizing: border-box;
	border-radius: 1.5vw;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.75) 0%,
		rgba(255, 255, 255, 0.55) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.7);
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
	transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;

	${(props: { $linked: boolean }) => (props.$linked
		? `
			&:hover {
				background: linear-gradient(
					135deg,
					rgba(255, 255, 255, 0.9) 0%,
					rgba(255, 255, 255, 0.7) 100%
				);
				border-color: rgba(255, 255, 255, 0.9);
				transform: translateY(-0.1vw);
			}
		`
		: '')}

	@media (min-width: 320px) and (max-width: 600px) {
		border-width: 0.25vw;
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		border-width: 0.125vw;
		backdrop-filter: blur(1.2vw);
		-webkit-backdrop-filter: blur(1.2vw);
	}

	@media (min-width: 2000px) {
		border-width: 1px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	@media (min-width: 320px) and (max-width: 600px) {
		min-height: 5.75vw;
		border-radius: 5vw;
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		min-height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0.4vw 0.75vw 0.4vw 0.75vw;
		margin: 0.5vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		border-radius: 30px;
		padding: 0 14px;
		margin: 3px 7px 3px 0;
		min-height: 48px;
		font-size: 24px;
	}

	p {
		margin: 0.14vw 0.347vw;
		display: inline-block;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: #1a1a1a;
		overflow-wrap: break-word;
		word-break: break-word;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 1vw 0.69vw 0 0.75vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 0.5vw 0.69vw 0 0.75vw;
		}

		@media (min-width: 2000px) {
			margin: 3px 7px;
		}
	}
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
			<Chip
				$linked={ Boolean(skill) }
				href={ skill ? `/skills?search=${encodeURIComponent(skill.name)}` : undefined }
			>
				<Typography variant={ 'project_desc' }>
					{ tech }
				</Typography>
			</Chip>
			{ skill ? (
				<div className={ 'skill-card-tooltip' }>
					<SkillCard skill={ skill } />
				</div>
			) : null }
		</Wrapper>
	);
};
