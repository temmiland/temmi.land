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
import { useEffect, useState } from 'react';
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
		margin: 5vw 0 10vw 11vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 0;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 12.5vw 4vw 0 4vw;
		}

		@media (min-width: 2000px) {
			margin: 100px 0 200px 240px;
		}
	}
`;

interface ProjectsProps {
	/**
	 * List of Projects
	 */
	projects?: Project[];
}

export const Projects = ({ projects }: ProjectsProps) => {

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollY(
			document.body.scrollHeight - window.innerHeight	- document.body.scrollTop
		), true);
	});

	return (
		<ProjectContainer id={ 'projects' }>
			<Trail
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: 550,
						tablet: 450,
						desktop: 400,
						oversize: 400
					}
				} }
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
				scrollY={ scrollY }
				visible={ {
					min: {
						phone: 0,
						tablet: 0,
						desktop: 0,
						oversize: 0
					},
					max: {
						phone: 525,
						tablet: 400,
						desktop: 350,
						oversize: 350
					}
				} }
				animationDirection={ 'right' }
				animationSpeed={ 50 }
			>
				<WProjects projects={ projects } />
			</Trail>
		</ProjectContainer>
	);
};
