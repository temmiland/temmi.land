import styled from 'styled-components';
/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { Image } from 'antd';

/**
 * Custom styles for antd Image component.
 */
const SImage = styled(Image)<ChurchOfOurLadyProps>`
    width: ${props => props.size}vw !important;

	@media (min-width: 320px) and (max-width: 1024px) {
		width: 8vw !important;
	}

	@media (min-width: 2000px) {
		width: ${props => ((props.size ?? 3) / 100)
			* Math.min(window.innerWidth, 2000)}px !important;
	}
`;

type ChurchOfOurLadyProps = {
	/**
	 * What width to use TODO: in vw
	 */
	size?: number;
}

export const ChurchOfOurLady = ({ size = 3 }: ChurchOfOurLadyProps) => (
	<SImage
		size={ size }
		src={ '/church-of-our-lady.png' }
		preview={ false }
		style={ {
			verticalAlign: 'bottom',
			filter: 'invert(1)',
			mixBlendMode: 'difference',
			zIndex: '3'
		} }
	/>
);
