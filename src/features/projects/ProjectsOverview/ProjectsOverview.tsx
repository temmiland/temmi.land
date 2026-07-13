/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Project } from '@/models/project';
import { styled } from 'styled-components';
import MoreTile from '@/features/projects/MoreTile';
import ProjectTile from '@/features/projects/ProjectTile';
import { media } from '@/styles';

const ProjectContainer = styled.div`
	display: grid;
	width: auto;
	gap: 1vw;
	place-items: center;
	grid-template-columns: repeat(5, 1fr);

	${media.mobile} {
		gap: 0;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(5, 1fr);
	}

	${media.tablet} {
		grid-template-columns: repeat(2, 1fr);
		gap: 2vw;
		width: auto;
	}

	${media.wide} {
		gap: 20px;
		width: auto;
	}
`;

interface ProjectsProps {
	/**
	 * List of ProjectsOverview
	 */
	projects?: Project[];
}

export const ProjectsOverview = ( { projects }: ProjectsProps) => (
	<ProjectContainer id={ 'project-list' }>
		{
			projects
				?.filter(project => project.isVisibleOnHome)
				?.map((project) => (
					<ProjectTile gridMode={ false } key={ project.id } project={ project } />
				))
		}
		<MoreTile />
	</ProjectContainer>
);
