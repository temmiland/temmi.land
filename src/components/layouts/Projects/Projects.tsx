/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Typography from '../../components/util/Typography';
import WProjects from '../../widgets/Projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trail from '../../components/util/Trail';

const ProjectContainer = styled.div`
	.project-header {
		margin: 3.5vw 6.5vw;

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 10vw 6.5vw 0vw 6.5vw;
		}

		@media (min-width: 2000px) {
			margin: 70px 130px;
		}
	}

	#project-list {
		margin: 5vw 0 20vw 11vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 0 0 20vw 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 12.5vw 4vw 12vw 4vw;
		}

		@media (min-width: 2000px) {
			margin: 100px 0 400px 240px;
		}
	}
`;

interface ProjectsProps {
	/**
	 * List of Projects
	 */
	projects?: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => (
	<ProjectContainer id={ 'projects' }>
		<Trail
			animationDirection={ 'left' }
			animationSpeed={ 50 }
		>
			<div className={ 'project-header' }>
				<Typography variant={ 'h1' }>
					{ 'Projects' }
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'dragon'] } />
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'carrot'] } />
					<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'code'] } />
				</Typography>
			</div>
		</Trail>
		<Trail
			animationDirection={ 'right' }
			animationSpeed={ 50 }
		>
			<WProjects projects={ projects } />
		</Trail>
	</ProjectContainer>
);
