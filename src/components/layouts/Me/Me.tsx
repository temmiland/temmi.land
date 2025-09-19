/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MeImage from '../../components/me/MeImage';
import MeInfo from '../../widgets/MeInfo';
import Trail from '../../components/util/Trail';

const MeContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	place-items: center;

	@media (min-width: 320px) and (max-width: 1024px) {
		grid-template-rows: repeat(2, 0.5fr);
		grid-template-columns: 1fr;
	}

	@media (min-width: 2000px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		height: 1055px;
	}

`;

const MeInfoContainer = styled.div`
	display: flex;
    justify-content: center;
    align-items: center;
	margin: 0 5vw;

	@media (min-width: 320px) and (max-width: 1024px) {
		z-index: 2;
	}

	@media (min-width: 2000px) {
		margin: 0 100px;
	}
`;

const MeImageContainer = styled.div`
	margin: 1.75vw auto;
	width: 70%;
	place-self: center;
	transform: translateY(-1.5vw);

	@media (min-width: 320px) and (max-width: 1024px) {
		margin: auto;
		width: 60%;
		transform: translateY(-8.25vw);
		z-index: 1;
	}

	@media (max-width: 480px) {
		width: 90%;
	}

	@media (min-width: 2000px) {
		margin: 0 140px;
	}

`;

export const Me = () => {

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollY(document.body.scrollTop), true);
	});

	return (
		<MeContainer>
			<MeInfoContainer>
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
							phone: 250,
							tablet: 500,
							desktop: 400,
							oversize: 400
						}
					} }
					animationDirection={ 'left' }
					animationConfig={ {
						mass: 5,
						tension: 4000,
						friction: 2000
					} }
				>
					<MeInfo />
				</Trail>
			</MeInfoContainer>

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
						phone: 250,
						tablet: 500,
						desktop: 400,
						oversize: 400
					}
				} }
				animationDirection={ 'right' }
				animationConfig={ {
					mass: 5,
					tension: 4000,
					friction: 2000
				} }
			>
				<MeImageContainer>
					<MeImage />
				</MeImageContainer>
			</Trail>
		</MeContainer>
	);
};
