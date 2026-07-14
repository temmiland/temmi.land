/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Project } from '@/models/project';
import styled, { css } from 'styled-components';
import { Link } from '@/ui/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import { Typography } from '@/ui/Typography/Typography';
import { colors, fluid, fonts, media, whiteAlpha } from '@/styles';

/**
 * Props for the container of a project tile.
 */
type ProjectTileContainerProps = {
	/** The background gradient of the container. */
	gradient: string;
	gridMode: boolean;
};

/**
 * Container for a ProjectTile.
 */
const ProjectTileContainer = styled.div<ProjectTileContainerProps>`
	background: ${(props: { gradient: string }) => props.gradient};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: ${fluid(18)};
	height: ${fluid(18)};
	border-radius: ${fluid(1.75)};
	border: 1px solid ${whiteAlpha(0.12)};
	color: ${colors.white};
	transition: 100ms linear 50ms;
	cursor: ${(props: { gridMode: boolean }) => (props.gridMode ? 'pointer' : '')};
	overflow: hidden;

	${media.mobile} {
		width: 87vw;
		height: 87vw;
		border-radius: 8.16vw;
	}

	${media.tablet} {
		width: 45vw;
		height: 45vw;
		border-radius: 3.5vw;
	}

	&:hover {
		transform: scale(${(props: { gridMode: boolean }) => (!props.gridMode ? '1.025' : '1.05')});
		z-index: 4;
	}
`;

/**
 * Frosted-glass surface for the description panel: translucent gradient
 * fill, soft light border and a backdrop blur, scaled per breakpoint.
 */
const glassPanel = css`
	background: linear-gradient(135deg, ${whiteAlpha(0.5)} 0%, ${whiteAlpha(0.32)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.55)};
	backdrop-filter: blur(1vw);
	-webkit-backdrop-filter: blur(1vw);

	${media.mobile} {
		border-width: 0.25vw;
		backdrop-filter: blur(3vw);
		-webkit-backdrop-filter: blur(3vw);
	}

	${media.tablet} {
		border-width: 0.125vw;
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	${media.wide} {
		border-width: 1px;
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
	}
`;

/**
 * Container for the ProjectDescription.
 */
const ProjectDescriptionContainer = styled.div`
	--project-desc-margin: ${fluid(0.9)};
	margin: var(--project-desc-margin);
	padding: ${fluid(0.9)};
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: ${fluid(0.9)};
	${glassPanel}
	line-height: ${fluid(1.15)};
	text-align: left;
	z-index: 3;

	${media.mobile} {
		--project-desc-margin: 4vw;
		padding: 4vw;
		border-radius: 4vw;
		line-height: 6vw;
	}

	${media.tablet} {
		--project-desc-margin: 2vw;
		padding: 2vw;
		border-radius: 2vw;
		line-height: 3vw;
	}

	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		text-decoration: none;
		cursor: pointer;
		background: linear-gradient(135deg, ${whiteAlpha(0.75)} 0%, ${whiteAlpha(0.55)} 100%) !important;
		border: 0.07vw solid ${whiteAlpha(0.8)} !important;
		backdrop-filter: blur(0.6vw);
		-webkit-backdrop-filter: blur(0.6vw);
		font-family: ${fonts.medium};
		font-size: 0.9vw !important;
		line-height: 1.5vw !important;
		height: 1.5vw !important;
		padding: 0 1vw !important;
		color: ${colors.surfaceLight};

		${media.mobile} {
			border-width: 0.25vw !important;
			backdrop-filter: blur(2vw);
			-webkit-backdrop-filter: blur(2vw);
		}

		${media.tablet} {
			border-width: 0.125vw !important;
			backdrop-filter: blur(1.2vw);
			-webkit-backdrop-filter: blur(1.2vw);
		}

		${media.wide} {
			border-width: 1px !important;
			backdrop-filter: blur(12px);
			-webkit-backdrop-filter: blur(12px);
		}

		${media.mobile} {
			font-size: 3.75vw !important;
			line-height: 7vw !important;
			height: 7vw !important;
			padding: 0 5vw !important;
			margin: 2vw 0 0 0;
		}

		${media.tablet} {
			font-size: 2.25vw !important;
			line-height: 4vw !important;
			height: 4vw !important;
			padding: 0 3vw !important;
			margin: 1vw 0 0 0;
		}

		${media.wide} {
			font-size: 18px !important;
			line-height: 23px;
			line-height: 30px !important;
			height: 30px !important;
			padding: 0 20px !important;
		}

		&:hover {
			background: linear-gradient(135deg, ${whiteAlpha(0.55)} 0%, ${whiteAlpha(0.35)} 100%) !important;
			border-color: ${whiteAlpha(0.65)} !important;
			color: ${colors.surfaceLight} !important;
		}
		&:active {
			background: linear-gradient(135deg, ${whiteAlpha(0.55)} 0%, ${whiteAlpha(0.35)} 100%) !important;
			border-color: ${whiteAlpha(0.65)} !important;
			outline: 0.17vw solid ${whiteAlpha(0.2)} !important;
			outline-offset: 0.06vw;
			transition:
				outline-offset 0s,
				outline 0s;
			color: ${colors.surfaceLight} !important;

			${media.wide} {
				outline: 4px solid ${whiteAlpha(0.2)} !important;
				outline-offset: 2px;
			}
		}
		&:focus {
			background: linear-gradient(135deg, ${whiteAlpha(0.55)} 0%, ${whiteAlpha(0.35)} 100%) !important;
			border-color: ${whiteAlpha(0.65)} !important;
			outline: 0.17vw solid ${whiteAlpha(0.2)} !important;
			outline-offset: 0.06vw;
			transition:
				outline-offset 0s,
				outline 0s;
			color: ${colors.surfaceLight} !important;

			${media.wide} {
				outline: 4px solid ${whiteAlpha(0.2)} !important;
				outline-offset: 2px;
			}
		}
		&:focus-visible {
			outline: 0.17vw solid ${whiteAlpha(0.2)} !important;
			outline-offset: 0.06vw;
			transition:
				outline-offset 0s,
				outline 0s;

			${media.wide} {
				outline: 4px solid ${whiteAlpha(0.2)} !important;
				outline-offset: 2px;
			}
		}
	}
`;

/**
 * Props for a project tile.
 */
type ProjectTileProps = {
	/** The project to be displayed. */
	project: Project;
	gridMode: boolean;
};

/**
 * ProjectTile component.
 * @param {ProjectTileProps} props - The props for the ProjectTile component.
 * @returns {JSX.Element} ProjectTile JSX element.
 */
export const ProjectTile = ({ project, gridMode = false }: ProjectTileProps): JSX.Element => (
	<ProjectTileContainer gridMode={gridMode} gradient={project.tileGradient}>
		<Typography variant={'project_header'}>
			<>
				<FontAwesomeIcon icon={project.tileIcon as IconName} /> {project.name}
			</>
		</Typography>
		<ProjectDescriptionContainer>
			<Typography variant={'project_desc'}>{project.description}</Typography>
			{!gridMode ? <Link href={project.href}>{'See more'}</Link> : ''}
		</ProjectDescriptionContainer>
	</ProjectTileContainer>
);
