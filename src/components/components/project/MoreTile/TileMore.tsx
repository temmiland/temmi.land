/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Link } from '../../util/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Container for a MoreTileContainer.
 */
const MoreTileContainer = styled.div`
    background: linear-gradient(90deg, #42275a 0%, #734b6d 100%);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 18vw;
    height: 18vw;
    border-radius: 1.75vw;
    color: #fff;
    font-size: 1.17vw;
	transition: 100ms linear 50ms;

	@media (min-width: 320px) and (max-width: 600px) {
		width: 80vw;
		height: 80vw;
		border-radius: 7.5vw;
		margin: 0 0 10vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		width: 45vw;
		height: 45vw;
		border-radius: 3.5vw;
		margin: 0 0 10vw 0;
	}

	@media (min-width: 2000px) {
		width: 360px;
    	height: 360px;
		border-radius: 35px;
		font-size: 23px;
	}

	svg {
		margin: 1vw 1.5vw;
		font-size: 4.7vw;

		@media (min-width: 320px) and (max-width: 600px) {
			margin: 27.5vw 20vw;
			font-size: 25vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			margin: 15vw 10vw;
			font-size: 15vw;
		}

		@media (min-width: 2000px) {
			margin: 133px 75px;
			font-size: 94px;
		}
	}

	&:hover {
		transform: scale(1.025);
		z-index: 4
	}
`;

/**
 * MoreTile component.
 * @returns {JSX.Element} MoreTile JSX element.
 */
export const MoreTile = (): JSX.Element => (
	<Link href={ '/project' }>
		<MoreTileContainer>
			<FontAwesomeIcon
				icon={ 'caret-right' }
			/>
		</MoreTileContainer>
	</Link>
);