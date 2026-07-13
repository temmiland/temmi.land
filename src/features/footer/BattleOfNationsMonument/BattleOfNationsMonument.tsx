import styled from 'styled-components';
/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Image } from 'antd';
import { media } from '@/styles';

/**
 * Custom styles for antd Image component.
 */
const SImage = styled(Image)<BattleOfNationsMonumentProps>`
	width: ${(props) => props.size}vw !important;

	${media.belowDesktop} {
		width: 8vw !important;
	}

	${media.wide} {
		width: ${(props) =>
		((props.size ?? 3) / 100) * Math.min(window.innerWidth, 2000)}px !important;
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
		preview={ false }
		style={ {
			verticalAlign: 'bottom',
			filter: 'invert(1)',
			mixBlendMode: 'difference',
			zIndex: '3'
		} }
	/>
);
