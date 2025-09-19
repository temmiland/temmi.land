/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import Typography from '../../components/util/Typography';
import { ExpandableGrid } from '@temmiland/react-expandable-grid';
import { projects } from '../../../data/projects';
import ProjectTile from '../../components/project/ProjectTile';
import { ProjectStatus } from '../../../models/projectstatus.d';
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

const LicenseHandle = styled.div`
	height: 2.4vw;
	border-radius: 1.5vw;
	background: rgba(255, 255, 255, 0.8);
	cursor: pointer;
	padding: 0 0 0 0.69vw;
	margin: 0 0.347vw;
	font-size: 1.17vw;

	display:inline-flex;
    align-items:center;
    justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		height: 5.75vw;
		border-radius: 5vw;
		padding: 0 1.25vw 0 2vw;
		margin: 0 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0 0.75vw 0 1.5vw;
		margin: 0 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		height: 48px;
		border-radius: 30px;
		padding: 0 0 0 14px;
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
		color: #5E5E5E;

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
	height: 2.4vw;
	border-radius: 1.5vw;
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	padding: 0 0 0 0.69vw;
	margin: 0 0.347vw;
	font-size: 1.17vw;

	display:inline-flex;
    align-items:center;
    justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		height: 5.75vw;
		border-radius: 5vw;
		padding: 0 1.25vw 0 2vw;
		margin: 0 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0 0.75vw 0 1.5vw;
		margin: 0 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		height: 48px;
		border-radius: 30px;
		padding: 0 0 0 14px;
		font-size: 24px;
		margin: 0 7px;
	}

	p {
		margin: 0.14vw 0.69vw 0 0.347vw;
		display: inline-block;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		vertical-align: bottom;
		color: #5E5E5E;

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
	background: rgba(255, 255, 255, 0.8);
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

const SkillHandle = styled.div`
	height: 2.4vw;
	border-radius: 1.5vw;
	background: rgba(255, 255, 255, 0.7);
	text-align: center;
	padding: 0 0.69vw;
	margin: 0.14vw 0.347vw 0.14vw 0;
	font-size: 1.17vw;

	display:inline-flex;
	align-items:center;
	justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		height: 5.75vw;
		border-radius: 5vw;
		padding: 0 1.25vw 0 2vw;
		margin: 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0 0.75vw 0 0.75vw;
		margin: 0.5vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		border-radius: 30px;
		padding: 0 14px;
		margin: 3px 7px 3px 0;
		height: 48px;
		font-size: 24px;
	}

	p {
		margin: 0.14vw 0.347vw;
		display: inline-block;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: #5E5E5E;

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

const LinkHandle = styled.div`
	height: 2.4vw;
	border-radius: 1.5vw;
	background: rgba(255, 255, 255, 0.8);
	text-align: center;
	padding: 0 0 0 0.69vw;
	cursor: pointer;
	margin: 0.14vw 0.347vw 0.14vw 0;
	font-size: 1.17vw;

	display:inline-flex;
	align-items:center;
	justify-content:center;

	@media (min-width: 320px) and (max-width: 600px) {
		height: 5.75vw;
		border-radius: 5vw;
		padding: 0 1.25vw 0 2vw;
		margin: 1vw;
		font-size: 3vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		height: 4.25vw;
		border-radius: 2.5vw;
		padding: 0 0.75vw 0 1.5vw;
		margin: 0.5vw 1vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		height: 48px;
		border-radius: 30px;
		padding: 0 0 0 14px;
		margin: 3px 7px 3px 0;
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
		color: #5E5E5E;

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
 * Container for the ProjectDescription.
 */
const ProjectDescriptionContainer = styled.div`
	grid-area: 1 / 1 / 2 / 4;
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	background: rgba(255,255,255,0.45);
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
	background: rgba(255,255,255,0.45);
	z-index: 6;

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
	background: rgba(255,255,255,0.45);
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
	background: rgba(255,255,255,0.45);
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
	background: rgba(255,255,255,0.45);
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

	const regex = new RegExp(`\\b${techToMatch}\\b`);
	const filteredProjects = techToMatch
		? projects.filter(project => regex.test(project.techStack))
		: projects

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
													color: '#5e5e5e'
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
													color: '#5e5e5e'
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
												color: '#5e5e5e'
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
									&& filteredProjects[currentIndex! - 1].demoHost === ''  ? (
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
														color: '#5e5e5e'
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
										filteredProjects[currentIndex! - 1].demoHref !== '' ? (
											<LinkHandle
												onClick={ () => (
													window.open(
														filteredProjects[currentIndex! - 1].demoHref
													)
												) }
											>
												<FontAwesomeIcon
													style={ {
														color: '#5e5e5e'
													} }
													icon={ 'globe' }
												/>
												<Typography variant={ 'project_desc' }>
													{ filteredProjects[currentIndex! - 1].demoHost }
												</Typography>
											</LinkHandle>
										) : ''
									}
								</ProjectSidebarTopContainer>

								<ProjectTechStackContainer>
									<Typography variant={ 'project_desc_bold' }>
										{ 'Skills / TechStack / Used technologies' }
									</Typography>
									{
										filteredProjects[currentIndex! - 1].techStack.map(
											(tech: string, i: number) => (
												<SkillHandle key={ i }>
													<Typography variant={ 'project_desc' }>
														{ tech }
													</Typography>
												</SkillHandle>
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
									<Typography variant={ 'project_desc' }>
										{ 'No blog posts available.' }
									</Typography>
								</ProjectBlogContainer>
							</ProjectGridAreaContainer>
						</ExpandableContainer>
					)
				})) }
				expandableElementWidthInPx={ elementWidth }
				fbJustifyContent={ 'space-between' }
				defaultSelectedIndex={
					filteredProjects.findIndex((project) => {
						return project.id === selectedProjectId;
					})
				}
			/>
		</ProjectGridContainer>
	);
}
