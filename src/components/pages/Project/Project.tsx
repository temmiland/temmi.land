/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useState } from 'react';
//import LProject from '../../layouts/Project';
import Footer from '../../layouts/Footer';
import ProjectGrid from '../../widgets/ProjectGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import Header from '../../layouts/Header';
import Trail from '../../components/util/Trail';
import Filter from '../../components/util/Filter';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const ProjectSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: #141414;
	display: grid;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 15vw 0vw 65vw 0vw;
	}

	.project-content {
		@media (min-width: 2000px) {
			margin: 0 auto;
		}
	}

	.project-header {
		margin: 3.5vw 6.5vw;
	}
`;

const FooterSection = styled.section`

	padding: 2.4vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 12vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 5vw 0;
	}

	@media (min-width: 2000px) {
		padding: 48px 0;
	}
`;

const PageGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 400;
	bottom: 0;
	pointer-events: none;

	@media (min-width: 2000px) {
		background: linear-gradient(
			90deg,
			rgba(0,0,0,1) 250px,
			rgba(0,0,0,0) 750px,
			rgba(0,0,0,0) 2750px,
			rgba(0,0,0,1) 3250px
		) no-repeat;
		background-attachment: fixed;
		background-size: 3500px 100%;
		background-position: center;
		min-height: 100%;
		min-width: 3250px;
		margin: 0;
	}

`;

const PageMountains = styled.div`
	position: relative;
	max-width: 3000px;
	height: 34vw;
	margin-left: auto;
	margin-right: auto;
    z-index: 300;
    background: url(./footer.svg);
    background-repeat: no-repeat;
    pointer-events: none;
	margin-top: -46.25vw;

	@media (min-width: 320px) and (max-width: 600px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -147.5vw;
		margin-right: -20vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -120vw;
		margin-right: -20vw;
	}

	@media (min-width: 2000px) {
    	background-size: cover;
		height: 1000px;
		margin-top: -1230px;
		background-position: center;
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
	/** The id of the selected project */
	selectedProjectId: string
}

export default function Project({ selectedProjectId }: PProjectProps) {

	const [techToMatch, setTechToMatch] = useState('');

	return (
		<>
			<HeaderSection>
				<Header animationDirection={ 'left' } />
			</HeaderSection>
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
							selectedProjectId={ selectedProjectId }
							techToMatch={ techToMatch }
						/>
					</Trail>
				</div>
			</ProjectSection>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
