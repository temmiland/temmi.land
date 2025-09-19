/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { styled } from 'styled-components';
import { MoreTile } from '../../components/project/MoreTile/TileMore';
import ProjectTile from '../../components/project/ProjectTile';

const ProjectContainer = styled.div`
	display: grid;
	width: auto;
	gap: 1vw;
	place-items: center;
	grid-template-columns: repeat(5, 1fr);

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 0;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(5, 1fr);
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-template-columns: repeat(2, 1fr);
		gap: 2vw;
		width: auto;
	}

	@media (min-width: 2000px) {
		gap: 20px;
		width: auto;
	}
`;

interface ProjectsProps {
	/**
	 * List of Projects
	 */
	projects?: Project[];
}

export const Projects = ( { projects }: ProjectsProps) => (
	<ProjectContainer id={ 'project-list' }>
		{
			projects
				?.filter(project => project.isVisibleOnHome)
				?.map((project, i) => (
					<ProjectTile gridMode={ false } key={ i } projectId={ project.id } />
				))
		}
		<MoreTile />
	</ProjectContainer>
);
