/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import Header from '@/features/header/Header';
import MeSection from '@/features/me/MeSection';
import AboutSection from '@/features/about/AboutSection';
import ProjectsSection from '@/features/projects/ProjectsSection';
import SkillsSection from '@/features/skills/SkillsSection';
import BlogSection from '@/features/blog/BlogSection';
import Footer from '@/features/footer/Footer';
import { projects } from '@/data/projects.ts';
import { skills } from '@/data/skills';
import { blogPosts } from '@/data/blog';
import { colors, media } from '@/styles';

const MeArea = styled.section`
	margin: 0 auto;
	position: relative;

	max-width: 2000px;

	${media.wide} {
		padding: 20px 0 0 0;
	}
`;

const HeaderSection = styled.section`
`;

const AboutArea = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 3.6vw 0 1vw 0;
	position: relative;

	max-width: 2000px;

	${media.wide} {
		padding: 72px 0;
	}

`;

const ProjectSection = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 3.6vw 0;
	position: relative;

	max-width: 2000px;

	${media.wide} {
		padding: 72px 0;
	}

`;

const SkillSection = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 2vw 0;
	position: relative;

	max-width: 2000px;

	${media.wide} {
		padding: 40px 0;
	}

`;

const BlogArea = styled.section`
	margin: 0 auto;
	z-index: 3;
	padding: 3.6vw 0;
	position: relative;

	max-width: 2000px;

	${media.wide} {
		padding: 72px 0;
	}

`;

const FooterSection = styled.section`
	padding: 2.4vw 0;

	${media.mobile} {
		padding: 12vw 0;
	}

	${media.tablet} {
		padding: 5vw 0;
	}

	${media.wide} {
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

	${media.wide} {
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

	${media.mobile} {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -147.5vw;
		margin-right: -20vw;
	}

	${media.tablet} {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -120vw;
		margin-right: -20vw;
	}

	${media.wide} {
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
		background-image: linear-gradient(135deg, ${colors.surface} 25%, transparent 25%),
			linear-gradient(225deg, ${colors.surface} 25%, transparent 25%);
		background-position: 0 0;
		rotate: 180deg;

		${media.mobile} {
			--pattern-size: 28px;
		}

		${media.tablet} {
			--pattern-size: 28px;
		}

		${media.desktop} {
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
					<Header revealAfterId={ 'hero-heading' } />
				</HeaderSection>
			</Section>
			<Section background={ colors.surfaceDark }>
				<MeArea>
					<MeSection />
				</MeArea>
			</Section>
			<Section background={ colors.surface }>
				<AboutArea>
					<AboutSection />
				</AboutArea>
			</Section>
			<Section background={ colors.surface }>
				<BlogArea>
					<BlogSection posts={ blogPosts } />
				</BlogArea>
			</Section>
			<Section background={ colors.surface }>
				<SkillSection>
					<SkillsSection skills={ skills } />
				</SkillSection>
			</Section>
			<Section background={ colors.surface }>
				<ProjectSection>
					<ProjectsSection projects={ projects } />
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
