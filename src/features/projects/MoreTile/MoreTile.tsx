/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Link } from '@/ui/Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, fluid, media, whiteAlpha } from '@/styles';

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
	width: ${fluid(18)};
	height: ${fluid(18)};
	border-radius: ${fluid(1.75)};
	color: ${colors.white};
	font-size: 1.17vw;
	transition: 100ms linear 50ms;

	${media.mobile} {
		width: 87vw;
		height: 87vw;
		border-radius: 8.16vw;
		justify-content: center;
		align-items: center;
	}

	${media.tablet} {
		width: 30vw;
		height: 30vw;
		border-radius: 2.33vw;
		justify-content: center;
		align-items: center;
	}

	${media.wide} {
		font-size: 23px;
	}

	svg {
		margin: 6.5vw 2.5vw;
		font-size: ${fluid(4.7)};

		${media.mobile} {
			margin: 0;
			font-size: 25vw;
		}

		${media.tablet} {
			margin: 0;
			font-size: 10vw;
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
