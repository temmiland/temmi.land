/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import ExpandedProject from '@/features/projects/ExpandedProject';
import { ExpandableGrid } from '@temmiland/react-expandable-grid';
import ProjectTile from '@/features/projects/ProjectTile';
import { useEffect, useRef, useState } from 'react';
import { Project } from '@/models/project';
import { BlogPost } from '@/models/blogpost';
import { breakpoints, columnsForWidth, fluidRange, media } from '@/styles';

const ProjectGridContainer = styled.div`
	padding: 0 5.5vw 3vw 5.5vw;
	max-width: 1545px;

	${media.belowDesktop} {
		padding: 0 ${fluidRange(41.2, 19.04)};
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

/**
 * Props for a project grid.
 */
type ProjectGridProps = {
	/** The projects to render. */
	projects: Project[];
	/** The blog posts related projects link to. */
	blogPosts: BlogPost[];
	/** The id of the selected project, if a project is deep-linked. */
	selectedProjectId?: string;
	techToMatch?: string;
};

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
	const gridRef = useRef<HTMLDivElement>(null);

	const calculateInitialElementWidth = (): number => {
		const size = window.innerWidth;
		return size >= breakpoints.wide ? 380 : (size * 0.75) / columnsForWidth(size);
	};

	const [elementWidth, setElementWidth] = useState<number>(calculateInitialElementWidth());

	const calculateElementWidth = (): number => {
		const size = window.innerWidth;
		if (size >= breakpoints.wide) {
			return 380;
		}
		const gridElement = gridRef.current;
		if (!gridElement) {
			return 0;
		}
		return gridElement.offsetWidth / columnsForWidth(size);
	};

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
		? projects.filter((project) =>
				project.techStack.some((tech: string) => normalizeTech(tech) === normalizeTech(techToMatch))
			)
		: projects;

	const selectedIndex = filteredProjects.findIndex((project) => project.id === selectedProjectId);

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
			<div ref={gridRef}>
				<ExpandableGrid
					elements={filteredProjects.map((project) => ({
						expandableElement: () => <ProjectTile project={project} gridMode={true} />,
						expandedElement: ({ currentIndex, close }) => (
							<ExpandedProject
								key={'expandable'}
								project={filteredProjects[currentIndex! - 1]}
								relatedPosts={blogPosts.filter(
									(post) => post.projectId === filteredProjects[currentIndex! - 1].id
								)}
								close={close}
							/>
						)
					}))}
					expandableElementWidthInPx={elementWidth}
					fbJustifyContent={'space-between'}
					defaultSelectedIndex={selectedIndex}
				/>
			</div>
		</ProjectGridContainer>
	);
};
