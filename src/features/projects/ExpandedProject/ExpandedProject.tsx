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
import SkillChip from '@/features/projects/SkillChip';
import { ProjectStatus } from '@/models/projectstatus';
import { formatBlogDate, formatReadingTime } from '@/utils/blogFormat';
import { Project } from '@/models/project';
import { BlogPost } from '@/models/blogpost';
import { colors, fluid, fluidRange, fonts, media, whiteAlpha } from '@/styles';

/**
 * Props for the container of a project tile.
 */
type ProjectTileContainerProps = {
	/** The background gradient of the container. */
	gradient: string;
	display?: string;
};

const ExpandableContainer = styled.div<ProjectTileContainerProps>`
	background: ${(props: ProjectTileContainerProps) => props.gradient};
	width: 100%;
	border-radius: ${fluid(1.75)};
	border: 1px solid ${whiteAlpha(0.12)};
	color: ${colors.white};
	transition: 100ms linear 50ms;
	margin-top: ${fluid(2)};
	padding-bottom: 0.07vw;

	${media.mobile} {
		padding: ${fluidRange(12.23, 6.9)};
		margin-top: 10vw;
		border-radius: ${fluidRange(29.26, 29.16)};
		width: calc(100% - 6vw);
	}

	${media.tablet} {
		padding: ${fluidRange(12.23, 6.9)};
		border-radius: ${fluidRange(29.26, 29.16)};
		width: calc(100% - 2vw);
	}

	${media.wide} {
		padding-bottom: 1.5px;
	}

	&:hover {
		transform: scale(1.01);
		z-index: 4;
	}

	h1 {
		margin: 0;
		padding: ${fluid(1.5)};

		${media.belowDesktop} {
			padding: ${fluidRange(10.91, 18.81)} ${fluidRange(10.26, 24.77)} ${fluidRange(10.91, 18.81)}
				${fluidRange(10.26, 24.77)};
		}
	}
`;

const Handles = styled.div`
	position: relative;
	float: right;
	top: ${fluid(-3.5)};
	display: flex;
	right: 0.347vw;

	${media.mobile} {
		top: ${fluidRange(-0.48, -74.07)};
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
		top: ${fluidRange(-0.48, -74.07)};
		right: 0.75vw;
	}

	${media.wide} {
		right: 7px;
	}
`;

/**
 * Shared frosted-glass surface for the small pill handles (license, status,
 * links, close): translucent gradient fill, light border and backdrop blur,
 * scaled per breakpoint.
 */
const glassChip = css`
	background: linear-gradient(135deg, ${whiteAlpha(0.75)} 0%, ${whiteAlpha(0.55)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.7)};
	backdrop-filter: blur(0.6vw);
	-webkit-backdrop-filter: blur(0.6vw);

	${media.mobile} {
		border-width: ${fluidRange(0.96, 1.07)};
		backdrop-filter: blur(2vw);
		-webkit-backdrop-filter: blur(2vw);
	}

	${media.tablet} {
		border-width: ${fluidRange(0.96, 1.07)};
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
	min-height: ${fluid(2.4)};
	border-radius: ${fluid(1.5)};
	${glassChip}
	font-size: 1.17vw;

	display: inline-flex;
	align-items: center;
	justify-content: center;

	${media.belowDesktop} {
		min-height: ${fluidRange(20.37, 41.02)};
		border-radius: ${fluidRange(19.29, 21.43)};
		font-size: ${fluidRange(10.91, 18.81)};
	}

	${media.wide} {
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

		${media.belowDesktop} {
			margin: ${fluidRange(3.86, 4.29)} ${fluidRange(2.21, 7.07)} 0 ${fluidRange(2.4, 7.68)};
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

	${media.belowDesktop} {
		padding: ${fluidRange(1.73, 3.93)} ${fluidRange(4.66, 6.85)} ${fluidRange(1.73, 3.93)}
			${fluidRange(7.06, 14.53)};
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

	${media.belowDesktop} {
		padding: ${fluidRange(1.73, 3.93)} ${fluidRange(4.66, 6.85)} ${fluidRange(1.73, 3.93)}
			${fluidRange(7.06, 14.53)};
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
	width: ${fluid(2.4)};
	height: ${fluid(2.4)};
	text-align: center;
	cursor: pointer;
	margin: 0 0.833vw 0 0.347vw;

	${media.mobile} {
		width: ${fluidRange(20.37, 41.02)};
		height: ${fluidRange(20.37, 41.02)};
	}

	${media.tablet} {
		width: ${fluidRange(20.37, 41.02)};
		height: ${fluidRange(20.37, 41.02)};
		margin: 0 1vw;
	}

	${media.wide} {
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

	${media.belowDesktop} {
		padding: ${fluidRange(1.73, 3.93)} ${fluidRange(4.66, 6.85)} ${fluidRange(1.73, 3.93)}
			${fluidRange(7.06, 14.53)};
		margin: ${fluidRange(3.86, 4.29)} 0;
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
	background: linear-gradient(135deg, ${whiteAlpha(0.5)} 0%, ${whiteAlpha(0.32)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.55)};
	backdrop-filter: blur(1vw);
	-webkit-backdrop-filter: blur(1vw);

	${media.mobile} {
		border-width: ${fluidRange(0.96, 1.07)};
		backdrop-filter: blur(3vw);
		-webkit-backdrop-filter: blur(3vw);
	}

	${media.tablet} {
		border-width: ${fluidRange(0.96, 1.07)};
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
	--project-desc-margin: 0.9vw;
	margin: var(--project-desc-margin);
	padding: 0.9vw;
	width: calc(100% - calc(var(--project-desc-margin) * 4));
	border-radius: 0.9vw;
	${glassPanel}
	z-index: ${(props: GlassPanelProps) => props.zIndex ?? 6};
	${(props: GlassPanelProps) => (props.minWidth ? `min-width: ${props.minWidth};` : '')}

	${media.mobile} {
		grid-area: ${(props: GlassPanelProps) => props.areaMobile};
		padding: ${fluidRange(5.93, 14.94)};
		--project-desc-margin: 1.5vw;
		border-radius: ${fluidRange(15.43, 17.14)};
	}

	${media.tablet} {
		padding: ${fluidRange(5.93, 14.94)};
		--project-desc-margin: 1.5vw;
		border-radius: ${fluidRange(15.43, 17.14)};
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
	gap: ${fluid(0.7)};
	margin-top: ${fluid(0.6)};

	${media.mobile} {
		grid-template-columns: repeat(1, 1fr);
		gap: ${fluidRange(9.45, 12.5)};
		margin-top: ${fluidRange(9.45, 12.5)};
	}

	${media.tablet} {
		gap: ${fluidRange(9.45, 12.5)};
		margin-top: ${fluidRange(9.45, 12.5)};
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
	gap: ${fluid(0.7)};
	min-width: 0;
	text-decoration: none;
	background: linear-gradient(135deg, ${whiteAlpha(0.55)} 0%, ${whiteAlpha(0.32)} 100%);
	border: 0.07vw solid ${whiteAlpha(0.6)};
	border-radius: ${fluid(0.7)};
	padding: 0.6vw 0.8vw;
	transition: 120ms ease;

	&:hover {
		background: linear-gradient(135deg, ${whiteAlpha(0.8)} 0%, ${whiteAlpha(0.5)} 100%);
		border-color: ${whiteAlpha(0.9)};
		transform: translateY(-0.1vw);
	}

	${media.belowDesktop} {
		gap: ${fluidRange(11.57, 12.86)};
		border-width: ${fluidRange(0.96, 1.07)};
		border-radius: ${fluidRange(11.57, 12.86)};
		padding: ${fluidRange(9.71, 10.12)} ${fluidRange(11.44, 14.05)};
	}

	${media.wide} {
		border-width: 1px;
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
		width: ${fluidRange(34.06, 44.52)};
		height: ${fluidRange(34.06, 44.52)};

		svg {
			font-size: 4vw;
		}
	}

	${media.tablet} {
		width: ${fluidRange(34.06, 44.52)};
		height: ${fluidRange(34.06, 44.52)};

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
	gap: ${fluid(0.1)};
	min-width: 0;

	${media.mobile} {
		gap: 0.6vw;
	}
`;

const ProjectBlogPostTitle = styled.span`
	font-family: ${fonts.medium};
	font-size: ${fluid(0.95)};
	color: ${colors.ink};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	${media.mobile} {
		font-size: ${fluidRange(14.4, 18.67)};
		white-space: normal;
	}

	${media.tablet} {
		font-size: ${fluidRange(14.4, 18.67)};
	}
`;

const ProjectBlogPostMeta = styled.span`
	font-family: ${fonts.light};
	font-size: ${fluid(0.75)};
	color: #5e5e5e;

	${media.belowDesktop} {
		font-size: ${fluidRange(11.76, 15.07)};
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
};

/**
 * The expanded panel of a project tile: header with license/status/close
 * handles, description, links, tech stack, documents and related blog posts.
 * @param {ExpandedProjectProps} props - The props for the ExpandedProject component.
 * @returns {JSX.Element} ExpandedProject JSX element.
 */
export const ExpandedProject = ({ project, relatedPosts, close }: ExpandedProjectProps): JSX.Element => {
	return (
		<ExpandableContainer gradient={project.tileGradient}>
			<Typography variant={'project_header'}>
				<>
					<FontAwesomeIcon icon={project.tileIcon as IconName} /> {project.name}
				</>
			</Typography>
			<Handles>
				{project.licenseHref !== '' ? (
					<LicenseHandle href={project.licenseHref} target={'_blank'} rel={'noopener noreferrer'}>
						<FontAwesomeIcon
							style={{
								color: colors.ink
							}}
							icon={'scale-balanced'}
						/>
						<Typography variant={'project_desc'}>{project.license}</Typography>
					</LicenseHandle>
				) : (
					''
				)}
				<StatusHandle>
					<FontAwesomeIcon
						style={{
							color: colors.ink
						}}
						icon={statusIcons[project.status]}
					/>
					<Typography variant={'project_desc'}>{project.status}</Typography>
				</StatusHandle>
				<div
					className={'close-handle'}
					style={{
						margin: 0,
						padding: 0
					}}
				>
					<CloseHandle type={'button'} onClick={close}>
						<FontAwesomeIcon
							style={{
								color: colors.ink
							}}
							icon={'close'}
						/>
					</CloseHandle>
				</div>
			</Handles>
			<ProjectGridAreaContainer>
				<GlassPanel area={'1 / 1 / 2 / 4'} areaMobile={'1 / 1 / 2 / 2'}>
					<Typography variant={'project_desc_bold'}>{'Description'}</Typography>
					<Typography variant={'project_desc'}>{project.longDescription}</Typography>
				</GlassPanel>

				<GlassPanel area={'1 / 4 / 2 / 6'} areaMobile={'3 / 1 / 4 / 2'}>
					<Typography variant={'project_desc_bold'}>{'Links'}</Typography>

					{project.repoHref === '' && project.links.length === 0 ? (
						<Typography variant={'project_desc'}>{'No links available.'}</Typography>
					) : (
						''
					)}

					{project.repoHref !== '' ? (
						<LinkHandle href={project.repoHref} target={'_blank'} rel={'noopener noreferrer'}>
							<FontAwesomeIcon
								style={{
									color: colors.ink
								}}
								icon={['fab', project.repoIcon as IconName]}
							/>
							<Typography variant={'project_desc'}>{project.repoHost}</Typography>
						</LinkHandle>
					) : (
						''
					)}
					{project.links.map((link) => (
						<LinkHandle
							key={link.href}
							href={link.href}
							target={'_blank'}
							rel={'noopener noreferrer'}
						>
							<FontAwesomeIcon
								style={{
									color: colors.ink
								}}
								icon={[(link.iconPrefix ?? 'fas') as IconPrefix, link.icon as IconName]}
							/>
							<Typography variant={'project_desc'}>{link.host}</Typography>
						</LinkHandle>
					))}
				</GlassPanel>

				<GlassPanel area={'2 / 1 / 3 / 4'} areaMobile={'2 / 1 / 3 / 2'} zIndex={7}>
					<Typography variant={'project_desc_bold'}>
						{'Skills / TechStack / Used technologies'}
					</Typography>
					{project.techStack.map((tech) => (
						<SkillChip key={tech} tech={tech} />
					))}
				</GlassPanel>

				<GlassPanel
					area={'2 / 4 / 3 / 6'}
					areaMobile={'4 / 1 / 5 / 2'}
					minWidth={'24.30vw'}
					minWidthWide={'486px'}
				>
					<Typography variant={'project_desc_bold'}>{'Documents'}</Typography>
					<Typography variant={'project_desc'}>{'No documents available.'}</Typography>
				</GlassPanel>

				<GlassPanel
					area={'3 / 1 / 4 / 6'}
					areaMobile={'5 / 1 / 6 / 2'}
					minWidth={'24.30vw'}
					minWidthWide={'486px'}
				>
					<Typography variant={'project_desc_bold'}>{'Blog Posts'}</Typography>
					{relatedPosts.length === 0 ? (
						<Typography variant={'project_desc'}>{'No blog posts available.'}</Typography>
					) : (
						<ProjectBlogPostList>
							{relatedPosts.map((post) => (
								<ProjectBlogPostCard key={post.id} to={`/blog/${post.id}`}>
									<ProjectBlogPostIcon gradient={post.tileGradient}>
										<FontAwesomeIcon
											icon={[
												(post.iconPrefix ?? 'fas') as IconPrefix,
												post.icon as IconName
											]}
										/>
									</ProjectBlogPostIcon>
									<ProjectBlogPostInfo>
										<ProjectBlogPostTitle>{post.title}</ProjectBlogPostTitle>
										<ProjectBlogPostMeta>
											{formatBlogDate(post.date)}
											{' · '}
											{formatReadingTime(post.readingMinutes)}
										</ProjectBlogPostMeta>
									</ProjectBlogPostInfo>
								</ProjectBlogPostCard>
							))}
						</ProjectBlogPostList>
					)}
				</GlassPanel>
			</ProjectGridAreaContainer>
		</ExpandableContainer>
	);
};
