/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { projects } from '../../../../data/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Typography } from '../../util/Typography/Typography';
import { Button } from 'antd';

/**
 * Props for the container of a project tile.
 */
type ProjectTileContainerProps = {
	/** The background gradient of the container. */
	gradient: string;
	gridMode: boolean;
}

/**
 * Container for a ProjectTile.
 */
const ProjectTileContainer = styled.div<ProjectTileContainerProps>`
    background: ${ (props: { gradient: string; }) => props.gradient };
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 18vw;
    height: 18vw;
    border-radius: 1.75vw;
    color: #fff;
	transition: 100ms linear 50ms;
    cursor: ${ (props: { gridMode: boolean; }) => props.gridMode ? 'pointer' : '' };
	overflow: hidden;

	@media (min-width: 320px) and (max-width: 600px) {
		width: 80vw;
		height: 80vw;
		border-radius: 7.5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		width: 45vw;
		height: 45vw;
		border-radius: 3.5vw;
	}

	@media (min-width: 2000px) {
		width: 360px;
		height: 360px;
		border-radius: 35px;
	}

	&:hover {
		transform: scale(${ (props: { gridMode: boolean; }) => !props.gridMode ? '1.025' : '1.05'});
		z-index: 4
	}
`;

/**
 * Container for the ProjectDescription.
 */
const ProjectDescriptionContainer = styled.div`
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	background: rgba(255,255,255,0.45);
	line-height: 1.15vw;
	text-align: left;
	z-index: 3;

	@media (min-width: 320px) and (max-width: 600px) {
		--project-desc-margin: 4vw;
		padding: 4vw;
		border-radius: 4vw;
		line-height: 6vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		--project-desc-margin: 2vw;
		padding: 2vw;
		border-radius: 2vw;
		line-height: 3vw;
	}

	@media (min-width: 2000px) {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
		line-height: 23px;
	}

	a {
		background: rgba(255,255,255,0.8);
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.9vw !important;
		line-height: 1.5vw !important;
		height: 1.5vw !important;
		padding: 0 1vw !important;
		color: #222222;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.75vw !important;
			line-height: 7vw !important;
			height: 7vw !important;
			padding: 0 5vw !important;
			margin: 2vw 0 0 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2.25vw !important;
			line-height: 4vw !important;
			height: 4vw !important;
			padding: 0 3vw !important;
			margin: 1vw 0 0 0;
		}

		@media (min-width: 2000px) {
			font-size: 18px !important;
			line-height: 23px;
			line-height: 30px !important;
			height: 30px !important;
			padding: 0 20px !important;
		}

		&:hover {
				background: rgba(255,255,255,0.6) !important;
				color: #222222 !important;
		}
		&:active {
			background: rgba(255,255,255,0.6) !important;
			outline: 0.17vw solid rgba(255,255,255,0.2) !important;
			outline-offset: 0.06vw;
			transition: outline-offset 0s,outline 0s;
			color: #222222 !important;

			@media (min-width: 2000px) {
				outline: 4px solid rgba(255,255,255,0.2) !important;
				outline-offset: 2px;
			}
		}
		&:focus {
			background: rgba(255,255,255,0.6) !important;
			outline: 0.17vw solid rgba(255,255,255,0.2) !important;
			outline-offset: 0.06vw;
			transition: outline-offset 0s,outline 0s;
			color: #222222 !important;

			@media (min-width: 2000px) {
				outline: 4px solid rgba(255,255,255,0.2) !important;
				outline-offset: 2px;
			}
		}
		&:focus-visible {
			outline: 0.17vw solid rgba(255,255,255,0.2) !important;
			outline-offset: 0.06vw;
			transition: outline-offset 0s,outline 0s;

			@media (min-width: 2000px) {
				outline: 4px solid rgba(255,255,255,0.2) !important;
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
}

/**
 * ProjectTile component.
 * @param {ProjectTileProps} props - The props for the ProjectTile component.
 * @returns {JSX.Element} ProjectTile JSX element.
 */
const ProjectTile = ({
	project = projects[0],
	gridMode = false
}: ProjectTileProps): JSX.Element => (
	<ProjectTileContainer
		gridMode={ gridMode }
		gradient={
			project.tileGradient
		}>
		<Typography variant={ 'project_header' }>
			<>
				<FontAwesomeIcon icon={ project.tileIcon as IconName } />
				{ ' ' }
				{ project.name }
			</>
		</Typography>
		<ProjectDescriptionContainer>
			<Typography variant={ 'project_desc' }>
				{ project.description }
			</Typography>
			{
				!gridMode ? (
					<Button type={ 'primary' } size={ 'small' } href={ project.href }>
						{ 'See more' }
					</Button>
				) : ''
			}
		</ProjectDescriptionContainer>
	</ProjectTileContainer>
);

interface ProjectTileWrapperProps {
	projectId: string;
	gridMode: boolean;
}

const projectOptions: Record<string, Project> =
	projects.reduce<Record<string, Project>>((acc, project) => {
		acc[project.id] = project;
		return acc;
	}, {});

const getProjectById = (id: string): Project => projectOptions[id];

export const ProjectTileWrapper = ({
	projectId,
	gridMode
}: ProjectTileWrapperProps): JSX.Element => {
	const project = getProjectById(projectId);
	return (
		<ProjectTile project={ project } gridMode={ gridMode } />
	);
};
