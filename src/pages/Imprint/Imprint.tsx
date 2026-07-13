/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import ImprintSection from '@/features/imprint/ImprintSection';
import Footer from '@/features/footer/Footer';
import Header from '@/features/header/Header';
import { colors, media } from '@/styles';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const ImprintArea = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 15vw 6vw;
	position: relative;
	background: ${colors.surface};

	${media.mobile} {
		padding: 22.6vw 2vw 60vw 2vw;
	}

	${media.tablet} {
		padding: 15vw 2vw 50vw 2vw;
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


export default function Imprint() {
	return (
		<>
			<HeaderSection>
				<Header animationDirection={ 'left' } />
			</HeaderSection>
			<ImprintArea>
				<ImprintSection />
			</ImprintArea>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
