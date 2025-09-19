/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Header from '../../layouts/Header';
import Me from '../../layouts/Me';
import About from '../../layouts/About';
import Projects from '../../layouts/Projects';
import Footer from '../../layouts/Footer';
import { projects } from '../../../data/projects.ts';

const MeSection = styled.section`
	margin: 0 auto;
	position: relative;

	max-width: 2000px;

	@media (min-width: 2000px) {
		padding: 20px 0 0 0;
	}
`;

const HeaderSection = styled.section`
`;

const AboutSection = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 3.6vw 0 1vw 0;
	position: relative;

	max-width: 2000px;

	@media (min-width: 2000px) {
		padding: 72px 0;
	}

`;

const ProjectSection = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 3.6vw 0;
	position: relative;

	max-width: 2000px;

	@media (min-width: 2000px) {
		padding: 72px 0;
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
    z-index: 3;
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

const Section = styled.div<SectionProps>`
	width: 100%;
	max-width: 3000px;
	margin: 0 auto;
	position: relative;
	background: ${props => props.background};

	&:before {
		--pattern-size: 35px;
		content: '';
		position: absolute;
		right: 0;
		left: -0%;
		bottom: 100%;
		z-index: 10;
		display: block;
		height: var(--pattern-size);
		background-size: var(--pattern-size) 100%;
		background-image: linear-gradient(135deg, #141414 25%, transparent 25%),
			linear-gradient(225deg, #141414 25%, transparent 25%);
		background-position: 0 0;
		rotate: 180deg;

		@media (min-width: 320px) and (max-width: 600px) {
			--pattern-size: 28px;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			--pattern-size: 28px;
		}

		@media (min-width: 1024px) and (max-width: 2000px) {
			--pattern-size: 1.75vw;
		}
	}
`;

type SectionProps = {
	background?: string;
	children?: JSX.Element;
}


export default function Home() {
	return (
		<>
			<Section background={ 'transparent' }>
				<HeaderSection>
					<Header
						visible={ {
							min: {
								phone: 275,
								tablet: 425,
								desktop: 400,
								oversize: 400
							},
							max: {
								phone: Infinity,
								tablet: Infinity,
								desktop: Infinity,
								oversize: Infinity
							}
						} }
					/>
				</HeaderSection>
			</Section>
			<Section background={ '#000' }>
				<MeSection>
					<Me />
				</MeSection>
			</Section>
			<Section background={ '#141414' }>
				<AboutSection>
					<About />
				</AboutSection>
			</Section>
			<Section background={ '#141414' }>
				<ProjectSection>
					<Projects projects={ projects } />
				</ProjectSection>
			</Section>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
