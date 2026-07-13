/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import HeaderContent from '@/features/header/HeaderContent';
import { styled } from 'styled-components';

const HeaderContainer = styled.div`
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
`;

type HeaderProps = {
	/**
	 * Id of the element the header should wait for. Once that element has
	 * scrolled above the viewport, the header reveals itself. Omit to show
	 * the header immediately (used on pages without a hero section).
	 */
	revealAfterId?: string;
	animationDirection?: 'top' | 'right' | 'bottom' | 'left';
};

/**
 * Header layout component. Fixed to the top of the page, it either shows
 * immediately or reveals itself once a given hero element has scrolled out
 * of view, using IntersectionObserver so it works consistently regardless
 * of document height or viewport size.
 * @param {HeaderProps} props - The props for the Header component.
 * @returns {JSX.Element} Header JSX element.
 */
export const Header = ({ revealAfterId, animationDirection = 'right' }: HeaderProps) => {
	const [isVisible, setIsVisible] = useState(!revealAfterId);

	useEffect(() => {
		if (!revealAfterId) return;

		const target = document.getElementById(revealAfterId);
		if (!target) {
			setIsVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.boundingClientRect.top < 0);
			},
			{
				threshold: 0
			}
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [revealAfterId]);

	const style = useSpring({
		config: {
			mass: 5,
			tension: 4000,
			friction: 800
		},
		opacity: isVisible ? 1 : 0,
		x:
			animationDirection !== 'top' && animationDirection !== 'bottom'
				? isVisible
					? 0
					: animationDirection === 'right'
						? 55
						: -55
				: 0
	});

	return (
		<HeaderContainer>
			<animated.div style={style}>
				<HeaderContent />
			</animated.div>
		</HeaderContainer>
	);
};
