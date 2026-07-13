/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { media } from '@/styles';

const SImage = styled.img<BattleOfNationsMonumentProps>`
	width: ${(props) => props.size}vw;

	${media.belowDesktop} {
		width: 8vw;
	}

	${media.wide} {
		width: ${(props) =>
		((props.size ?? 3) / 100) * Math.min(window.innerWidth, 2000)}px;
	}
`;

type BattleOfNationsMonumentProps = {
	/**
	 * What width to use TODO: in vw
	 */
	size?: number;
};

export const BattleOfNationsMonument = ({ size = 3 }: BattleOfNationsMonumentProps) => (
	<SImage
		size={ size }
		src={ '/battle-of-nations-monument.png' }
		alt={ '' }
		style={ {
			verticalAlign: 'bottom',
			filter: 'invert(1)',
			mixBlendMode: 'difference',
			zIndex: '3'
		} }
	/>
);
