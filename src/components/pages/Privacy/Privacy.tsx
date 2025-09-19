/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import LPrivacy from '../../layouts/Privacy';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const PrivacySection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: #141414;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 22.6vw 2vw 60vw 2vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 15vw 2vw 50vw 2vw;
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

export default function Privacy() {
	return (
		<>
			<HeaderSection>
				<Header
					visible={ {
						min: {
							phone: 0,
							tablet: 0,
							desktop: 0,
							oversize: 0
						},
						max: {
							phone: Infinity,
							tablet: Infinity,
							desktop: Infinity,
							oversize: Infinity
						}
					} }
					animationDirection={ 'left' }
				/>
			</HeaderSection>
			<PrivacySection>
				<LPrivacy />
			</PrivacySection>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
