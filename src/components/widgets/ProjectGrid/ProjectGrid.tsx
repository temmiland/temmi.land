/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import Typography from '../../components/util/Typography';
import { ExpandableGrid } from '@temmiland/react-expandable-grid';
import { projects } from '../../../data/projects';
import { blogPosts } from '../../../data/blog';
import ProjectTile from '../../components/project/ProjectTile';
import SkillChip from '../../components/project/SkillChip';
import { ProjectStatus } from '../../../models/projectstatus.d';
import { formatBlogDate, formatReadingTime } from '../../../utils/blogFormat';
import { useEffect, useState } from 'react';

/**
 * Props for the container of a project tile.
 */
type ProjectTileContainerProps = {
	/** The background gradient of the container. */
	gradient: string;
	display?: string;
}

const ExpandableContainer = styled.div<ProjectTileContainerProps>`
    background: ${(props: ProjectTileContainerProps) => props.gradient};
	width: 100%;
    border-radius: 1.75vw;
	border: 1px solid rgba(255, 255, 255, 0.12);
    color: #fff;
	transition: 100ms linear 50ms;
	margin-top: 2vw;
	padding-bottom: 0.07vw;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 3vw;
		margin-top: 10vw;
    	border-radius: 7.5vw;
		width: calc(100% - 6vw);
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1vw;
    	border-radius: 3.5vw;
		width: calc(100% - 2vw);
	}

	@media (min-width: 2000px) {
		margin-top: 40px;
		padding-bottom: 1.5px;
    	border-radius: 35px;
	}

	&:hover {
		transform: scale(1.01);
		z-index: 4
	}

	h1 {
		margin: 0;
		padding: 1.5vw;

		@media (min-width: 320px) and (max-width: 600px) {
			padding: 3vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			padding: 2vw 2.5vw;
		}

		@media (min-width: 2000px) {
			padding: 30px;
		}
	}
`;

const Handles = styled.div`
	position: relative;
	float: right;
	top: -3.5vw;
	display: flex;
	right: 0.347vw;

	@media (min-width: 320px) and (max-width: 600px) {
		top: -2vw;
		left: 0vw;
		float: left;
		width: calc(100% - 2vw);

		.close-handle {
			position: absolute;
			right: -1.5vw;
			top: -11vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		top: -6.5vw;
		right: 0.75vw;
	}

	@media (min-width: 2000px) {
		top: -70px;
		right: 7px;
	}
`;

/**
 * Shared frosted-glass surface for the small pill handles (license, status,
 * links, close): translucent gradient fill, light border and backdrop blur,
 * scaled per breakpoint.
 */
const glassChip = css`
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.75) 0%,
		rgba(255, 255, 255, 0.55) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(0.6vw);
	-webkit-backdrop-filter: blur(0.6vw);

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
`;

const LicenseHandle = styled.div`
	min-height: 2.4vw;
	border-radius: 1.5vw;
	${glassChip}
	cursor: pointer;
	padding: 0.2vw 0 0.2vw 0.69vw;
	margin: 0 0.347vw;
	font-size: 1.17vw;

	display:inline-flex;
    align-items:center;
    justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		min-height: 5.75vw;
		border-radius: 5vw;
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 0 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		min-height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		min-height: 48px;
		border-radius: 30px;
		padding: 2px 0 2px 14px;
		font-size: 24px;
		margin: 0 7px;
	}

	&:hover {
		scale: 1.025;
	}

	p {
		margin: 0.14vw 0.69vw 0 0.347vw;
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
			margin: 3px 14px 0 7px;
		}
	}
`;

const StatusHandle = styled.div`
	min-height: 2.4vw;
	border-radius: 1.5vw;
	${glassChip}
	text-align: center;
	padding: 0.2vw 0 0.2vw 0.69vw;
	margin: 0 0.347vw;
	font-size: 1.17vw;

	display:inline-flex;
    align-items:center;
    justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		min-height: 5.75vw;
		border-radius: 5vw;
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 0 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		min-height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		min-height: 48px;
		border-radius: 30px;
		padding: 2px 0 2px 14px;
		font-size: 24px;
		margin: 0 7px;
	}

	p {
		margin: 0.14vw 0.69vw 0 0.347vw;
		display: inline-block;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		vertical-align: bottom;
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
			margin: 3px 14px 0 7px;
		}
	}
`;

const CloseHandle = styled.div`
	width: 2.4vw;
	height: 2.4vw;
	border-radius: 1.5vw;
	${glassChip}
	text-align: center;
	cursor: pointer;
	margin: 0 0.833vw 0 0.347vw;
	font-size: 1.17vw;

	display:inline-flex;
    align-items:center;
    justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		width: 5.75vw;
		height: 5.75vw;
		border-radius: 5vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		width: 4.25vw;
		height: 4.25vw;
		border-radius: 2.5vw;
		margin: 0 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		border-radius: 30px;
		margin: 0 17px 0 7px;
		width: 48px;
		height: 48px;
		font-size: 24px;
	}

	&:hover {
		scale: 1.05;
	}
`;

const LinkHandle = styled.div`
	min-height: 2.4vw;
	width: fit-content;
	max-width: 100%;
	box-sizing: border-box;
	border-radius: 1.5vw;
	${glassChip}
	text-align: left;
	padding: 0.2vw 0.69vw 0.2vw 0.69vw;
	cursor: pointer;
	margin: 0.347vw 0;
	font-size: 1.17vw;

	display: flex;
	align-items: center;
	justify-content: flex-start;

	@media (min-width: 320px) and (max-width: 600px) {
		min-height: 5.75vw;
		border-radius: 5vw;
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 1vw 0;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		min-height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0.5vw 0;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		min-height: 48px;
		border-radius: 30px;
		padding: 2px 14px 2px 14px;
		margin: 7px 0;
		font-size: 24px;
	}

	&:hover {
		scale: 1.025;
	}

	p {
		margin: 0.14vw 0.69vw 0 0.347vw;
		display: inline-block;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		vertical-align: bottom;
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
			margin: 3px 14px 0 7px;
		}
	}
`;

/**
 * Shared frosted-glass surface for the large content panels (description,
 * links, tech stack, docs, blog): translucent gradient fill, soft light border
 * and a stronger backdrop blur, scaled per breakpoint.
 */
const glassPanel = css`
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.5) 0%,
		rgba(255, 255, 255, 0.32) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.55);
	backdrop-filter: blur(1vw);
	-webkit-backdrop-filter: blur(1vw);

	@media (min-width: 320px) and (max-width: 600px) {
		border-width: 0.25vw;
		backdrop-filter: blur(3vw);
		-webkit-backdrop-filter: blur(3vw);
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		border-width: 0.125vw;
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	@media (min-width: 2000px) {
		border-width: 1px;
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
	}
`;

/**
 * Container for the ProjectDescription.
 */
const ProjectDescriptionContainer = styled.div`
	grid-area: 1 / 1 / 2 / 4;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: 6;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-area: 1 / 1 / 2 / 2;
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
	}
`;

/**
 * Container for the ProjectTechStack.
 */
const ProjectTechStackContainer = styled.div`
	grid-area: 2 / 1 / 3 / 4;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: 7;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-area:  2 / 1 / 3 / 2;
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
	}
`;


/**
 * Container for the ProjectTechStack.
 */
const ProjectSidebarTopContainer = styled.div`
	grid-area: 1 / 4 / 2 / 6;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: 6;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-area: 3 / 1 / 4 / 2;
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
	}
`;

/**
 * Container for the ProjectTechStack.
 */
const ProjectDocsContainer = styled.div`
	grid-area: 2 / 4 / 3 / 6;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: 6;
	min-width: 24.30vw;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-area: 4 / 1 / 5 / 2;
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
		min-width: 486px;
	}
`;

/**
 * Container for the ProjectTechStack.
 */
const ProjectBlogContainer = styled.div`
	grid-area: 3 / 1 / 4 / 6;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: 6;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-area: 5 / 1 / 6 / 2;
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
		min-width: 486px;
	}
`;

const ProjectBlogPostList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.7vw;
	margin-top: 0.6vw;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(1, 1fr);
		gap: 2.5vw;
		margin-top: 2.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1.4vw;
		margin-top: 1.4vw;
	}

	@media (min-width: 2000px) {
		gap: 14px;
		margin-top: 12px;
	}
`;

/**
 * A single blog post entry within a project's expanded panel, styled after
 * SkillCard: a small glass card with a gradient icon badge, title and
 * date/reading-time meta line, linking to the full article.
 */
const ProjectBlogPostCard = styled.a`
	display: flex;
	align-items: center;
	gap: 0.7vw;
	min-width: 0;
	text-decoration: none;
	background: linear-gradient(
		135deg,
		rgba(255, 255, 255, 0.55) 0%,
		rgba(255, 255, 255, 0.32) 100%
	);
	border: 0.07vw solid rgba(255, 255, 255, 0.6);
	border-radius: 0.7vw;
	padding: 0.6vw 0.8vw;
	transition: 120ms ease;

	&:hover {
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.8) 0%,
			rgba(255, 255, 255, 0.5) 100%
		);
		border-color: rgba(255, 255, 255, 0.9);
		transform: translateY(-0.1vw);
	}

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 3vw;
		border-width: 0.25vw;
		border-radius: 3vw;
		padding: 2.5vw 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1.5vw;
		border-width: 0.125vw;
		border-radius: 1.5vw;
		padding: 1.2vw 1.6vw;
	}

	@media (min-width: 2000px) {
		gap: 14px;
		border-width: 1px;
		border-radius: 14px;
		padding: 12px 16px;
	}
`;

const ProjectBlogPostIcon = styled.div<{ gradient: string }>`
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2.2vw;
	height: 2.2vw;
	border-radius: 50%;
	background: ${(props: { gradient: string }) => props.gradient};
	color: #ffffff;

	svg {
		font-size: 1vw;
	}

	@media (min-width: 320px) and (max-width: 600px) {
		width: 9vw;
		height: 9vw;

		svg {
			font-size: 4vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		width: 5vw;
		height: 5vw;

		svg {
			font-size: 2.2vw;
		}
	}

	@media (min-width: 2000px) {
		width: 44px;
		height: 44px;

		svg {
			font-size: 20px;
		}
	}
`;

const ProjectBlogPostInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1vw;
	min-width: 0;

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 0.6vw;
	}

	@media (min-width: 2000px) {
		gap: 2px;
	}
`;

const ProjectBlogPostTitle = styled.span`
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 0.95vw;
	color: #1a1a1a;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 3.8vw;
		white-space: normal;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 2.1vw;
	}

	@media (min-width: 2000px) {
		font-size: 19px;
	}
`;

const ProjectBlogPostMeta = styled.span`
	font-family: 'Bogart Light', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 0.75vw;
	color: #5e5e5e;

	@media (min-width: 320px) and (max-width: 600px) {
		font-size: 3.1vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		font-size: 1.7vw;
	}

	@media (min-width: 2000px) {
		font-size: 15px;
	}
`;

const ProjectGridContainer = styled.div`
	padding: 0 5.5vw 3vw 5.5vw;
	max-width: 1545px;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 0 10vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 0 3vw;
	}

	@media (min-width: 2000px) {
		min-width: 1600px;
	}

	.expandable {
		margin-top: 2vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin-top: 10vw;
		}
	}
`;

const ProjectGridAreaContainer = styled.div`
	width: 100%;
	display: grid;
	grid-column-gap: 0vw;
	grid-row-gap: 0vw;
	grid-template-columns: repeat(5, 20%);

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: repeat(1, 100%);
	}

`;

/**
 * Props for a project grid.
 */
type ProjectGridProps = {
	/** The id of the selected project */
	selectedProjectId: string,
	techToMatch?: string
}

/**
 * ProjectTile component.
 * @param {ProjectTileProps} props - The props for the ProjectTile component.
 * @returns {JSX.Element} ProjectTile JSX element.
 */
export const ProjectGrid = ({ selectedProjectId, techToMatch }: ProjectGridProps): JSX.Element => {

	const calculateInitialElementWidth = (): number => {
		const size = window.innerWidth;
		const columns = size >= 320 && size <= 600 ? 1 : size >= 600 && size <= 1024 ? 2 : 4;
		return size >= 2000 ? 360 : size * 0.75 / columns;
	};

	const [elementWidth, setElementWidth] = useState<number>(calculateInitialElementWidth());

	useEffect(() => {
		const handleResize = () => {
			setElementWidth(calculateElementWidth());
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const calculateElementWidth = (): number => {
		const element = document.getElementsByClassName('expandable-grid') as
			HTMLCollectionOf<HTMLElement>;
		const size = window.innerWidth;
		return element !== undefined && element.length > 0
			? size >= 320 && size <= 600
				? element[0].offsetWidth / 1
				: size >= 600 && size <= 1024
					? element[0].offsetWidth / 2
					: size >= 2000
						? 380
						: element[0].offsetWidth / 4
			: 0
	}

	const normalizeTech = (value: string) => value.toLowerCase().replace(/[\s-]+/g, '-');
	const filteredProjects = techToMatch
		? projects.filter(project => project.techStack.some(
			(tech: string) => normalizeTech(tech) === normalizeTech(techToMatch)
		))
		: projects

	const selectedIndex = filteredProjects.findIndex(
		(project) => project.id === selectedProjectId
	);

	// When a project is deep-linked (e.g. /project/<id>), the ExpandableGrid
	// opens the matching panel via defaultSelectedIndex. Scroll that expanded
	// panel into view once it is rendered. The delay lets the page entry
	// (Trail) animation settle so we scroll to the panel's final position.
	useEffect(() => {
		if (selectedIndex < 0) {
			return;
		}

		const timeout = window.setTimeout(() => {
			const expanded = document.querySelector('.expanded') as HTMLElement | null;
			if (!expanded) {
				return;
			}

			// Align the panel's top near the viewport top, but leave some
			// breathing room above (scroll-margin-top is honoured by
			// scrollIntoView) so the header/top area stays readable.
			expanded.style.scrollMarginTop = '18vh';
			expanded.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}, 300);

		return () => window.clearTimeout(timeout);
	}, [selectedIndex]);

	return (
		<ProjectGridContainer>
			<ExpandableGrid
				elements={ filteredProjects.map(project => ({
					expandableElement: () => (
						<ProjectTile
							projectId={ project.id }
							gridMode={ true }
						/>
					),
					expandedElement: ({ currentIndex, close }) => (
						<ExpandableContainer
							gradient={ filteredProjects[currentIndex! - 1].tileGradient }
							key={ 'expandable' }
						>
							<Typography variant={ 'project_header' }>
								<>
									<FontAwesomeIcon
										icon={
										filteredProjects[currentIndex! - 1].tileIcon as IconName
										}
									/>
									{ ' ' }
									{ filteredProjects[currentIndex! - 1].name }
								</>
							</Typography>
							<Handles>
								{
									filteredProjects[currentIndex! - 1].licenseHref !== '' ? (
										<LicenseHandle
											onClick={ () => {
												window.open(
													filteredProjects[currentIndex! - 1].licenseHref
												)
											} }
										>
											<FontAwesomeIcon
												style={ {
													color: '#1a1a1a'
												} }
												icon={ 'scale-balanced' }
											/>
											<Typography variant={ 'project_desc' }>
												{ filteredProjects[currentIndex! - 1].license }
											</Typography>
										</LicenseHandle>
									) : ''
								}
								{
									filteredProjects[currentIndex! - 1].status !== '' ? (
										<StatusHandle>
											<FontAwesomeIcon
												style={ {
													color: '#1a1a1a'
												} }
												icon={ filteredProjects[currentIndex! - 1].status
									=== ProjectStatus.CONCEPT ?
													'boxes-stacked' :
													filteredProjects[currentIndex! - 1].status
										=== ProjectStatus.PLANNED ?
														'box-open' :
														filteredProjects[currentIndex! - 1].status
											=== ProjectStatus.WORKING_ON ?
															'boxes-packing' :
															filteredProjects[currentIndex! - 1].status
												=== ProjectStatus.PAUSED ?
																'box' :
																filteredProjects[currentIndex! - 1].status
													=== ProjectStatus.DONE ?
																	'truck-ramp-box' :
																	'circle-exclamation' }
											/>
											<Typography variant={ 'project_desc' }>
												{ filteredProjects[currentIndex! - 1].status }
											</Typography>
										</StatusHandle>
									) : ''
								}
								<div className={ 'close-handle' } style={ {
									margin: 0, padding: 0
								} }>
									<CloseHandle
										onClick={ close }
									>
										<FontAwesomeIcon
											style={ {
												color: '#1a1a1a'
											} }
											icon={ 'close' }
										/>
									</CloseHandle>
								</div>
							</Handles>
							<ProjectGridAreaContainer>
								<ProjectDescriptionContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Description' }
									</Typography>
									<Typography variant={ 'project_desc' }>
										{ filteredProjects[currentIndex! - 1].longDescription }
									</Typography>
								</ProjectDescriptionContainer>

								<ProjectSidebarTopContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Links' }
									</Typography>

									{
										filteredProjects[currentIndex! - 1].repoHref === ''
									&& filteredProjects[currentIndex! - 1].links.length === 0 ? (
												<Typography variant={ 'project_desc' }>
													{ 'No links available.' }
												</Typography>
											) : ''
									}

									{
										filteredProjects[currentIndex! - 1].repoHref !== '' ? (
											<LinkHandle
												onClick={ () => (
													window.open(
														filteredProjects[currentIndex! - 1].repoHref
													)
												) }
											>
												<FontAwesomeIcon
													style={ {
														color: '#1a1a1a'
													} }
													icon={ [
														'fab',
											filteredProjects[currentIndex! - 1].repoIcon as IconName
													] }
												/>
												<Typography variant={ 'project_desc' }>
													{ filteredProjects[currentIndex! - 1].repoHost }
												</Typography>
											</LinkHandle>
										) : ''
									}
									{
										filteredProjects[currentIndex! - 1].links.map(
											(link, i: number) => (
												<LinkHandle
													key={ i }
													onClick={ () => window.open(link.href) }
												>
													<FontAwesomeIcon
														style={ {
															color: '#1a1a1a'
														} }
														icon={ [
															(link.iconPrefix ?? 'fas') as IconPrefix,
															link.icon as IconName
														] }
													/>
													<Typography variant={ 'project_desc' }>
														{ link.host }
													</Typography>
												</LinkHandle>
											)
										)
									}
								</ProjectSidebarTopContainer>

								<ProjectTechStackContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Skills / TechStack / Used technologies' }
									</Typography>
									{
										filteredProjects[currentIndex! - 1].techStack.map(
											(tech: string, i: number) => (
												<SkillChip key={ i } tech={ tech } />
											)
										)
									}
								</ProjectTechStackContainer>

								<ProjectDocsContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Documents' }
									</Typography>
									<Typography variant={ 'project_desc' }>
										{ 'No documents available.' }
									</Typography>
								</ProjectDocsContainer>

								<ProjectBlogContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Blog Posts' }
									</Typography>
									{
										(() => {
											const relatedPosts = blogPosts.filter(
												(post) => post.projectId
													=== filteredProjects[currentIndex! - 1].id
											);

											if (relatedPosts.length === 0) {
												return (
													<Typography variant={ 'project_desc' }>
														{ 'No blog posts available.' }
													</Typography>
												);
											}

											return (
												<ProjectBlogPostList>
													{ relatedPosts.map((post) => (
														<ProjectBlogPostCard
															key={ post.id }
															href={ `/blog/${post.id}` }
														>
															<ProjectBlogPostIcon
																gradient={ post.tileGradient }
															>
																<FontAwesomeIcon
																	icon={ [
																		(post.iconPrefix ?? 'fas') as
																			IconPrefix,
																		post.icon as IconName
																	] }
																/>
															</ProjectBlogPostIcon>
															<ProjectBlogPostInfo>
																<ProjectBlogPostTitle>
																	{ post.title }
																</ProjectBlogPostTitle>
																<ProjectBlogPostMeta>
																	{ formatBlogDate(post.date) }
																	{ ' · ' }
																	{
																		formatReadingTime(
																			post.readingMinutes
																		)
																	}
																</ProjectBlogPostMeta>
															</ProjectBlogPostInfo>
														</ProjectBlogPostCard>
													)) }
												</ProjectBlogPostList>
											);
										})()
									}
								</ProjectBlogContainer>
							</ProjectGridAreaContainer>
						</ExpandableContainer>
					)
				})) }
				expandableElementWidthInPx={ elementWidth }
				fbJustifyContent={ 'space-between' }
				defaultSelectedIndex={ selectedIndex }
			/>
		</ProjectGridContainer>
	);
}
