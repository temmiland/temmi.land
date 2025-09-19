/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { styled } from 'styled-components';
import { pages } from '../../../data/pages';
import PageCardList from '../../components/header/PageCardList';
import Signature from '../../components/me/Signature';
import Link from '../../components/util/Link';


const HeaderContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	box-shadow: 0 0.28vw 2.08vw rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(1.39vw);
	--webkit-backdrop-filter: blur(1.39vw);
	top: 0;
	width: 100%;
	height: 3.82vw;
	position: absolute;
	display: grid;
	grid-template-columns: 20% 30%;

	@media (min-width: 320px) and (max-width: 600px) {
		height: 20vw;
		grid-template-columns: 40% 60%;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		height: 10vw;
		grid-template-columns: 40% 65%;
	}

	@media (min-width: 2000px) {
		box-shadow: 0 5.5px 42px rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(28px);
		--webkit-backdrop-filter: blur(28px);
		height: 75px;
	}
`;

const LinkContainer = styled.div`
	transform: scale(0.5);
	margin: -0.75vw -3.47vw 0 0;

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 0.5vw 0 0 -10vw;
	}
		
	@media (min-width: 600px) and (max-width: 1024px) {
		margin: -1vw 0 0 -5vw;
	}

	@media (min-width: 2000px) {
		margin: -15px -69px 0 0;
	}
`;

export const Header = () => {
	return (
		<HeaderContainer>
			<LinkContainer>
				<Link href={ '/' }>
					<Signature disableAnimation={ true } />
				</Link>
			</LinkContainer>
			<PageCardList pages={ pages } />
		</HeaderContainer>
	)
};