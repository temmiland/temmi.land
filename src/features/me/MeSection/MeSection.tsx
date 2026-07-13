/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import MeImage from '@/features/me/MeImage';
import MeInfo from '@/features/me/MeInfo';
import Trail from '@/ui/Trail';
import { media } from '@/styles';

const MeContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 1fr;
	place-items: center;

	${media.belowDesktop} {
		grid-template-rows: repeat(2, 0.5fr);
		grid-template-columns: 1fr;
	}

	${media.wide} {
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

	${media.belowDesktop} {
		z-index: 2;
	}

	${media.wide} {
		margin: 0 100px;
	}
`;

const MeImageContainer = styled.div`
	margin: 2.75vw auto;
	width: 70%;
	place-self: center;
	transform: translateY(calc(-1.5vw + 35px));

	${media.belowDesktop} {
		margin: auto;
		width: 60%;
		transform: translateY(calc(-1vw + 20px));
		z-index: 1;
	}

	@media (max-width: 480px) {
		width: 90%;
	}

	${media.wide} {
		margin: 0 140px;
	}
`;

export const MeSection = () => (
	<MeContainer>
		<MeInfoContainer>
			<Trail
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
