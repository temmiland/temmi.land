/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Link } from '@/ui/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, media, whiteAlpha } from '@/styles';

/**
 * Container for a MoreTileContainer.
 */
const MoreTileContainer = styled.div`
	background: linear-gradient(90deg, #241a2e 0%, #3a2740 100%);
	border: 1px solid ${whiteAlpha(0.12)};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 18vw;
	height: 18vw;
	border-radius: 1.75vw;
	color: ${colors.white};
	font-size: 1.17vw;
	transition: 100ms linear 50ms;

	${media.mobile} {
		width: 80vw;
		height: 80vw;
		border-radius: 7.5vw;
		margin: 0 0 10vw 0;
	}

	${media.tablet} {
		width: 45vw;
		height: 45vw;
		border-radius: 3.5vw;
		margin: 0 0 10vw 0;
	}

	${media.wide} {
		width: 360px;
		height: 360px;
		border-radius: 35px;
		font-size: 23px;
	}

	svg {
		margin: 1vw 1.5vw;
		font-size: 4.7vw;

		${media.mobile} {
			margin: 27.5vw 20vw;
			font-size: 25vw;
		}

		${media.tablet} {
			margin: 15vw 10vw;
			font-size: 15vw;
		}

		${media.wide} {
			margin: 133px 75px;
			font-size: 94px;
		}
	}

	&:hover {
		transform: scale(1.025);
		z-index: 4;
	}
`;

/**
 * MoreTile component.
 * @returns {JSX.Element} MoreTile JSX element.
 */
export const MoreTile = (): JSX.Element => (
	<Link href={'/project'}>
		<MoreTileContainer>
			<FontAwesomeIcon icon={'caret-right'} />
		</MoreTileContainer>
	</Link>
);
