/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useState } from 'react';
import ProjectGrid from '@/features/projects/ProjectGrid';
import { projects } from '@/data/projects';
import { blogPosts } from '@/data/blog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@/ui/Typography';
import Header from '@/features/header/Header';
import Trail from '@/ui/Trail';
import Filter from '@/ui/Filter';
import PageLayout from '@/ui/PageLayout';
import { colors, media } from '@/styles';

const ProjectSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: ${colors.surface};
	display: grid;

	${media.mobile} {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	${media.tablet} {
		padding: 15vw 0vw 65vw 0vw;
	}

	.project-content {
		${media.wide} {
			margin: 0 auto;
		}
	}

	.project-header {
		margin: 3.5vw 6.5vw;
	}
`;

const projectTechOptions = [
	{
		value: 'typescript', label: 'Typescript'
	},
	{
		value: 'javascript', label: 'Javascript'
	},
	{
		value: 'react', label: 'React'
	},
	{
		value: 'react-native', label: 'React-Native & Expo'
	},
	{
		value: 'angular', label: 'Angular'
	},
	{
		value: 'Java', label: 'Java'
	},
	{
		value: 'kotlin', label: 'Kotlin'
	}
];

/**
 * Props for a project grid.
 */
type PProjectProps = {
	/** The id of the selected project, if a project is deep-linked. */
	selectedProjectId?: string
}

export default function Project({ selectedProjectId }: PProjectProps) {

	const [techToMatch, setTechToMatch] = useState('');

	return (
		<PageLayout header={ <Header animationDirection={ 'left' } /> }>
			<ProjectSection>
				<div className={ 'project-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<div className={ 'project-header' }>
							<Typography variant={ 'h1' }>
								{ 'Projects' }
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'dragon'] }
								/>
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'carrot'] }
								/>
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'code'] }
								/>
							</Typography>
						</div>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<Filter
							options={ projectTechOptions }
							activeValue={ techToMatch }
							onChange={ setTechToMatch }
						/>
						<ProjectGrid
							projects={ projects }
							blogPosts={ blogPosts }
							selectedProjectId={ selectedProjectId }
							techToMatch={ techToMatch }
						/>
					</Trail>
				</div>
			</ProjectSection>
		</PageLayout>
	);
}
