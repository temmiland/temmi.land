/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { useEffect, useState } from 'react';
import WHeader from '../../widgets/Header'
import Trail from '../../components/util/Trail';
import { styled } from 'styled-components';

const HeaderContainer = styled.div`
	position: fixed;
	z-index: 1000;
	top: 0;
	width: 100%;
`;

type HeaderProps = {
	visible: {
		min: {
			phone: number,
			tablet: number,
			desktop: number,
			oversize: number
		},
		max: {
			phone: number,
			tablet: number,
			desktop: number,
			oversize: number
		}
	},
	animationDirection?: 'top' | 'right' | 'bottom' | 'left'
}


export const Header = ({ visible, animationDirection = 'right' }: HeaderProps) => {

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollY(document.body.scrollTop), true);
	});

	return (
		<HeaderContainer>
			<Trail
				scrollY={ scrollY }
				visible={ visible }
				animationSpeed={ 55 }
				animationDirection={ animationDirection }
			>
				<WHeader/>
			</Trail>
		</HeaderContainer>

	);
};
