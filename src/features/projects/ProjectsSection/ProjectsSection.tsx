/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Project } from '@/models/project';
import styled from 'styled-components';
import Typography from '@/ui/Typography';
import ProjectsOverview from '@/features/projects/ProjectsOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Trail from '@/ui/Trail';
import { media } from '@/styles';

const ProjectContainer = styled.div`
	scroll-margin-top: var(--header-height);

	.project-header {
		margin: 3.5vw 6.5vw;

		${media.tablet} {
			margin: 10vw 6.5vw 0vw 6.5vw;
		}

		${media.wide} {
			margin: 70px 130px;
		}
	}

	#project-list {
		margin: 5vw 0 20vw 11vw;

		${media.mobile} {
			margin: 0 0 20vw 0;
		}

		${media.tablet} {
			margin: 12.5vw 4vw 12vw 4vw;
		}

		${media.wide} {
			margin: 100px 0 400px 240px;
		}
	}
`;

interface ProjectsProps {
	/**
	 * List of ProjectsSection
	 */
	projects?: Project[];
}

export const ProjectsSection = ({ projects }: ProjectsProps) => (
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
			<ProjectsOverview projects={ projects } />
		</Trail>
	</ProjectContainer>
);
