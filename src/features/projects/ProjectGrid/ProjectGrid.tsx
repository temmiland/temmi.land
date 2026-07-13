/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import Typography from '@/ui/Typography';
import { ExpandableGrid } from '@temmiland/react-expandable-grid';
import ProjectTile from '@/features/projects/ProjectTile';
import SkillChip from '@/features/projects/SkillChip';
import { ProjectStatus } from '@/models/projectstatus';
import { formatBlogDate, formatReadingTime } from '@/utils/blogFormat';
import { useEffect, useState } from 'react';
import { Project } from '@/models/project';
import { BlogPost } from '@/models/blogpost';
import { colors, fonts, media, whiteAlpha } from '@/styles';

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
	border: 1px solid ${whiteAlpha(0.12)};
    color: ${colors.white};
	transition: 100ms linear 50ms;
	margin-top: 2vw;
	padding-bottom: 0.07vw;

	${media.mobile} {
		padding: 3vw;
		margin-top: 10vw;
    	border-radius: 7.5vw;
		width: calc(100% - 6vw);
	}

	${media.tablet} {
		padding: 1vw;
    	border-radius: 3.5vw;
		width: calc(100% - 2vw);
	}

	${media.wide} {
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

		${media.mobile} {
			padding: 3vw;
		}

		${media.tablet} {
			padding: 2vw 2.5vw;
		}

		${media.wide} {
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

	${media.mobile} {
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

	${media.tablet} {
		top: -6.5vw;
		right: 0.75vw;
	}

	${media.wide} {
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
		${whiteAlpha(0.75)} 0%,
		${whiteAlpha(0.55)} 100%
	);
	border: 0.07vw solid ${whiteAlpha(0.7)};
	backdrop-filter: blur(0.6vw);
	-webkit-backdrop-filter: blur(0.6vw);

	${media.mobile} {
		border-width: 0.25vw;
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	${media.tablet} {
		border-width: 0.125vw;
		backdrop-filter: blur(1.2vw);
		-webkit-backdrop-filter: blur(1.2vw);
	}

	${media.wide} {
		border-width: 1px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
`;

/**
 * Shared layout of the small pill handles: glass surface, pill radius and the
 * dark label typography, scaled per breakpoint.
 */
const handleBase = css`
	box-sizing: border-box;
	min-height: 2.4vw;
	border-radius: 1.5vw;
	${glassChip}
	font-size: 1.17vw;

	display: inline-flex;
	align-items: center;
	justify-content: center;

	${media.mobile} {
		min-height: 5.75vw;
		border-radius: 5vw;
		font-size: 3vw;
	}

	${media.tablet} {
		min-height: 4.25vw;
		border-radius: 2.5vw;
		font-size: 2vw;
	}

	${media.wide} {
		min-height: 48px;
		border-radius: 30px;
		font-size: 24px;
	}

	p {
		margin: 0.14vw 0.69vw 0 0.347vw;
		display: inline-block;
		font-family: ${fonts.medium};
		vertical-align: bottom;
		color: ${colors.ink};
		overflow-wrap: break-word;
		word-break: break-word;

		${media.mobile} {
			margin: 1vw 0.69vw 0 0.75vw;
		}

		${media.tablet} {
			margin: 0.5vw 0.69vw 0 0.75vw;
		}

		${media.wide} {
			margin: 3px 14px 0 7px;
		}
	}
`;

const LicenseHandle = styled.a`
	${handleBase}
	cursor: pointer;
	text-decoration: none;
	padding: 0.2vw 0 0.2vw 0.69vw;
	margin: 0 0.347vw;

	${media.mobile} {
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 0 1vw;
	}

	${media.tablet} {
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0 1vw;
	}

	${media.wide} {
		padding: 2px 0 2px 14px;
		margin: 0 7px;
	}

	&:hover {
		scale: 1.025;
	}
`;

const StatusHandle = styled.div`
	${handleBase}
	text-align: center;
	padding: 0.2vw 0 0.2vw 0.69vw;
	margin: 0 0.347vw;

	${media.mobile} {
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 0 1vw;
	}

	${media.tablet} {
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0 1vw;
	}

	${media.wide} {
		padding: 2px 0 2px 14px;
		margin: 0 7px;
	}
`;

const CloseHandle = styled.button`
	${handleBase}
	appearance: none;
	font: inherit;
	padding: 0;
	width: 2.4vw;
	height: 2.4vw;
	text-align: center;
	cursor: pointer;
	margin: 0 0.833vw 0 0.347vw;

	${media.mobile} {
		width: 5.75vw;
		height: 5.75vw;
	}

	${media.tablet} {
		width: 4.25vw;
		height: 4.25vw;
		margin: 0 1vw;
	}

	${media.wide} {
		width: 48px;
		height: 48px;
		margin: 0 17px 0 7px;
	}

	&:hover {
		scale: 1.05;
	}
`;

const LinkHandle = styled.a`
	${handleBase}
	width: fit-content;
	max-width: 100%;
	text-align: left;
	text-decoration: none;
	padding: 0.2vw 0.69vw 0.2vw 0.69vw;
	cursor: pointer;
	margin: 0.347vw 0;

	display: flex;
	justify-content: flex-start;

	${media.mobile} {
		padding: 0.5vw 1.25vw 0.5vw 2vw;
		margin: 1vw 0;
	}

	${media.tablet} {
		padding: 0.4vw 0.75vw 0.4vw 1.5vw;
		margin: 0.5vw 0;
	}

	${media.wide} {
		padding: 2px 14px 2px 14px;
		margin: 7px 0;
	}

	&:hover {
		scale: 1.025;
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
		${whiteAlpha(0.5)} 0%,
		${whiteAlpha(0.32)} 100%
	);
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
 * Props for a GlassPanel: each of the five content panels in a project's
 * expanded view (description, links, tech stack, docs, blog) differ only in
 * where they sit in the grid, their stacking order and (for two of them) a
 * minimum width, so they share a single parameterized component instead of
 * five near-identical ~35-line styled-components.
 */
type GlassPanelProps = {
	/** `grid-area` on desktop/tablet/wide. */
	area: string;
	/** `grid-area` on mobile, where the layout collapses to a single column. */
	areaMobile: string;
	zIndex?: number;
	minWidth?: string;
	minWidthWide?: string;
};

/**
 * Shared container for the five large content panels in a project's expanded
 * view (description, links, tech stack, docs, blog posts).
 */
const GlassPanel = styled.div<GlassPanelProps>`
	grid-area: ${(props: GlassPanelProps) => props.area};
	--project-desc-margin: 0.90vw;
	margin: var(--project-desc-margin);
	padding: 0.90vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.90vw;
	${glassPanel}
	z-index: ${(props: GlassPanelProps) => props.zIndex ?? 6};
	${(props: GlassPanelProps) => (props.minWidth ? `min-width: ${props.minWidth};` : '')}

	${media.mobile} {
		grid-area: ${(props: GlassPanelProps) => props.areaMobile};
		padding: 1.75vw;
		--project-desc-margin: 1.5vw;
		border-radius: 4vw;
	}

	${media.tablet} {
		padding: 1.5vw;
		--project-desc-margin: 1.5vw;
		border-radius: 2vw;
	}

	${media.wide} {
		--project-desc-margin: 18px;
		padding: 18px;
		border-radius: 18px;
		${(props: GlassPanelProps) => (props.minWidthWide ? `min-width: ${props.minWidthWide};` : '')}
	}
`;

const ProjectBlogPostList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.7vw;
	margin-top: 0.6vw;

	${media.mobile} {
		grid-template-columns: repeat(1, 1fr);
		gap: 2.5vw;
		margin-top: 2.5vw;
	}

	${media.tablet} {
		gap: 1.4vw;
		margin-top: 1.4vw;
	}

	${media.wide} {
		gap: 14px;
		margin-top: 12px;
	}
`;

/**
 * A single blog post entry within a project's expanded panel, styled after
 * SkillCard: a small glass card with a gradient icon badge, title and
 * date/reading-time meta line, linking to the full article.
 */
const ProjectBlogPostCard = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.7vw;
	min-width: 0;
	text-decoration: none;
	background: linear-gradient(
		135deg,
		${whiteAlpha(0.55)} 0%,
		${whiteAlpha(0.32)} 100%
	);
	border: 0.07vw solid ${whiteAlpha(0.6)};
	border-radius: 0.7vw;
	padding: 0.6vw 0.8vw;
	transition: 120ms ease;

	&:hover {
		background: linear-gradient(
			135deg,
			${whiteAlpha(0.8)} 0%,
			${whiteAlpha(0.5)} 100%
		);
		border-color: ${whiteAlpha(0.9)};
		transform: translateY(-0.1vw);
	}

	${media.mobile} {
		gap: 3vw;
		border-width: 0.25vw;
		border-radius: 3vw;
		padding: 2.5vw 3vw;
	}

	${media.tablet} {
		gap: 1.5vw;
		border-width: 0.125vw;
		border-radius: 1.5vw;
		padding: 1.2vw 1.6vw;
	}

	${media.wide} {
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
	color: ${colors.white};

	svg {
		font-size: 1vw;
	}

	${media.mobile} {
		width: 9vw;
		height: 9vw;

		svg {
			font-size: 4vw;
		}
	}

	${media.tablet} {
		width: 5vw;
		height: 5vw;

		svg {
			font-size: 2.2vw;
		}
	}

	${media.wide} {
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

	${media.mobile} {
		gap: 0.6vw;
	}

	${media.wide} {
		gap: 2px;
	}
`;

const ProjectBlogPostTitle = styled.span`
	font-family: ${fonts.medium};
	font-size: 0.95vw;
	color: ${colors.ink};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	${media.mobile} {
		font-size: 3.8vw;
		white-space: normal;
	}

	${media.tablet} {
		font-size: 2.1vw;
	}

	${media.wide} {
		font-size: 19px;
	}
`;

const ProjectBlogPostMeta = styled.span`
	font-family: ${fonts.light};
	font-size: 0.75vw;
	color: #5e5e5e;

	${media.mobile} {
		font-size: 3.1vw;
	}

	${media.tablet} {
		font-size: 1.7vw;
	}

	${media.wide} {
		font-size: 15px;
	}
`;

const ProjectGridContainer = styled.div`
	padding: 0 5.5vw 3vw 5.5vw;
	max-width: 1545px;

	${media.mobile} {
		padding: 0 10vw;
	}

	${media.tablet} {
		padding: 0 3vw;
	}

	${media.wide} {
		min-width: 1600px;
	}

	.expandable {
		margin-top: 2vw;

		${media.mobile} {
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

	${media.mobile} {
		grid-template-columns: repeat(1, 100%);
	}

`;

/**
 * Maps each project status to the FontAwesome icon shown in its handle.
 */
const statusIcons: Record<ProjectStatus, IconName> = {
	[ProjectStatus.CONCEPT]: 'boxes-stacked',
	[ProjectStatus.PLANNED]: 'box-open',
	[ProjectStatus.WORKING_ON]: 'boxes-packing',
	[ProjectStatus.PAUSED]: 'box',
	[ProjectStatus.DONE]: 'truck-ramp-box'
};

/**
 * Props for the expanded panel of a project tile.
 */
type ExpandedProjectProps = {
	/** The project shown in the panel. */
	project: Project;
	/** The blog posts related to the project. */
	relatedPosts: BlogPost[];
	/** Collapses the panel again. */
	close: () => void;
}

/**
 * The expanded panel of a project tile: header with license/status/close
 * handles, description, links, tech stack, documents and related blog posts.
 * @param {ExpandedProjectProps} props - The props for the ExpandedProject component.
 * @returns {JSX.Element} ExpandedProject JSX element.
 */
const ExpandedProject = ({ project, relatedPosts, close }: ExpandedProjectProps): JSX.Element => {

	return (
		<ExpandableContainer gradient={ project.tileGradient }>
			<Typography variant={ 'project_header' }>
				<>
					<FontAwesomeIcon icon={ project.tileIcon as IconName } />
					{ ' ' }
					{ project.name }
				</>
			</Typography>
			<Handles>
				{
					project.licenseHref !== '' ? (
						<LicenseHandle
							href={ project.licenseHref }
							target={ '_blank' }
							rel={ 'noopener noreferrer' }
						>
							<FontAwesomeIcon
								style={ {
									color: colors.ink
								} }
								icon={ 'scale-balanced' }
							/>
							<Typography variant={ 'project_desc' }>
								{ project.license }
							</Typography>
						</LicenseHandle>
					) : ''
				}
				<StatusHandle>
					<FontAwesomeIcon
						style={ {
							color: colors.ink
						} }
						icon={ statusIcons[project.status] }
					/>
					<Typography variant={ 'project_desc' }>
						{ project.status }
					</Typography>
				</StatusHandle>
				<div className={ 'close-handle' } style={ {
					margin: 0, padding: 0
				} }>
					<CloseHandle type={ 'button' } onClick={ close }>
						<FontAwesomeIcon
							style={ {
								color: colors.ink
							} }
							icon={ 'close' }
						/>
					</CloseHandle>
				</div>
			</Handles>
			<ProjectGridAreaContainer>
				<GlassPanel area={ '1 / 1 / 2 / 4' } areaMobile={ '1 / 1 / 2 / 2' }>
					<Typography variant={ 'project_desc_bold' }>
						{ 'Description' }
					</Typography>
					<Typography variant={ 'project_desc' }>
						{ project.longDescription }
					</Typography>
				</GlassPanel>

				<GlassPanel area={ '1 / 4 / 2 / 6' } areaMobile={ '3 / 1 / 4 / 2' }>
					<Typography variant={ 'project_desc_bold' }>
						{ 'Links' }
					</Typography>

					{
						project.repoHref === '' && project.links.length === 0 ? (
							<Typography variant={ 'project_desc' }>
								{ 'No links available.' }
							</Typography>
						) : ''
					}

					{
						project.repoHref !== '' ? (
							<LinkHandle
								href={ project.repoHref }
								target={ '_blank' }
								rel={ 'noopener noreferrer' }
							>
								<FontAwesomeIcon
									style={ {
										color: colors.ink
									} }
									icon={ ['fab', project.repoIcon as IconName] }
								/>
								<Typography variant={ 'project_desc' }>
									{ project.repoHost }
								</Typography>
							</LinkHandle>
						) : ''
					}
					{
						project.links.map((link) => (
							<LinkHandle
								key={ link.href }
								href={ link.href }
								target={ '_blank' }
								rel={ 'noopener noreferrer' }
							>
								<FontAwesomeIcon
									style={ {
										color: colors.ink
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
						))
					}
				</GlassPanel>

				<GlassPanel area={ '2 / 1 / 3 / 4' } areaMobile={ '2 / 1 / 3 / 2' } zIndex={ 7 }>
					<Typography variant={ 'project_desc_bold' }>
						{ 'Skills / TechStack / Used technologies' }
					</Typography>
					{
						project.techStack.map((tech) => (
							<SkillChip key={ tech } tech={ tech } />
						))
					}
				</GlassPanel>

				<GlassPanel
					area={ '2 / 4 / 3 / 6' }
					areaMobile={ '4 / 1 / 5 / 2' }
					minWidth={ '24.30vw' }
					minWidthWide={ '486px' }
				>
					<Typography variant={ 'project_desc_bold' }>
						{ 'Documents' }
					</Typography>
					<Typography variant={ 'project_desc' }>
						{ 'No documents available.' }
					</Typography>
				</GlassPanel>

				<GlassPanel
					area={ '3 / 1 / 4 / 6' }
					areaMobile={ '5 / 1 / 6 / 2' }
					minWidth={ '24.30vw' }
					minWidthWide={ '486px' }
				>
					<Typography variant={ 'project_desc_bold' }>
						{ 'Blog Posts' }
					</Typography>
					{
						relatedPosts.length === 0 ? (
							<Typography variant={ 'project_desc' }>
								{ 'No blog posts available.' }
							</Typography>
						) : (
							<ProjectBlogPostList>
								{ relatedPosts.map((post) => (
									<ProjectBlogPostCard
										key={ post.id }
										to={ `/blog/${post.id}` }
									>
										<ProjectBlogPostIcon gradient={ post.tileGradient }>
											<FontAwesomeIcon
												icon={ [
													(post.iconPrefix ?? 'fas') as IconPrefix,
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
												{ formatReadingTime(post.readingMinutes) }
											</ProjectBlogPostMeta>
										</ProjectBlogPostInfo>
									</ProjectBlogPostCard>
								)) }
							</ProjectBlogPostList>
						)
					}
				</GlassPanel>
			</ProjectGridAreaContainer>
		</ExpandableContainer>
	);
};

/**
 * Props for a project grid.
 */
type ProjectGridProps = {
	/** The projects to render. */
	projects: Project[],
	/** The blog posts related projects link to. */
	blogPosts: BlogPost[],
	/** The id of the selected project, if a project is deep-linked. */
	selectedProjectId?: string,
	techToMatch?: string
}

/**
 * ProjectGrid component. Renders all (optionally filtered) projects as an
 * expandable grid of tiles.
 * @param {ProjectGridProps} props - The props for the ProjectGrid component.
 * @returns {JSX.Element} ProjectGrid JSX element.
 */
export const ProjectGrid = ({
	projects,
	blogPosts,
	selectedProjectId,
	techToMatch
}: ProjectGridProps): JSX.Element => {

	const calculateInitialElementWidth = (): number => {
		const size = window.innerWidth;
		const columns = size >= 320 && size <= 600 ? 1 : size >= 600 && size <= 1024 ? 2 : 4;
		return size >= 2000 ? 380 : size * 0.75 / columns;
	};

	const [elementWidth, setElementWidth] = useState<number>(calculateInitialElementWidth());

	const calculateElementWidth = (): number => {
		const elements = document.getElementsByClassName('expandable-grid') as
			HTMLCollectionOf<HTMLElement>;
		const size = window.innerWidth;
		if (size >= 2000) {
			return 380;
		}
		if (elements.length === 0) {
			return 0;
		}
		const columns = size <= 600 ? 1 : size <= 1024 ? 2 : 4;
		return elements[0].offsetWidth / columns;
	}

	useEffect(() => {
		// Measure the real rendered grid width once mounted (replacing the
		// pre-render estimate), then keep it in sync on resize. A measurement of
		// 0 means the grid element isn't in the DOM yet, so keep the current
		// value instead of collapsing the tiles to zero width.
		const handleResize = () => {
			const measured = calculateElementWidth();
			if (measured > 0) {
				setElementWidth(measured);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
							project={ project }
							gridMode={ true }
						/>
					),
					expandedElement: ({ currentIndex, close }) => (
						<ExpandedProject
							key={ 'expandable' }
							project={ filteredProjects[currentIndex! - 1] }
							relatedPosts={ blogPosts.filter(
								(post) => post.projectId === filteredProjects[currentIndex! - 1].id
							) }
							close={ close }
						/>
					)
				})) }
				expandableElementWidthInPx={ elementWidth }
				fbJustifyContent={ 'space-between' }
				defaultSelectedIndex={ selectedIndex }
			/>
		</ProjectGridContainer>
	);
}
