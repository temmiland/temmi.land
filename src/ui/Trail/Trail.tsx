/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { animated, useTrail } from 'react-spring';

const Trail: React.FC<{
	animationDirection?: 'top' | 'right' | 'bottom' | 'left',
	animationSpeed?: number,
	animationDelay?: number,
	animationConfig?: {
		mass: number,
		tension: number,
		friction: number
	},
	children: ReactNode | ReactNode[]
}> = ({
	animationDirection = 'right',
	animationSpeed = 200,
	animationDelay = 0,
	animationConfig = {
		mass: 5,
		tension: 4000,
		friction: 800
	},
	children
}) => {

	const containerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = containerRef.current;
		if (!node) return;

		// Reveal once the element actually enters the viewport, instead of
		// relying on hardcoded scroll-pixel thresholds that don't hold up
		// across wildly different document heights (phone vs desktop).
		// threshold must stay 0: observed blocks can be many times taller
		// than the viewport, so a ratio-based threshold would never fire.
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{
				threshold: 0,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const items = React.Children.toArray(children);
	const trail = useTrail(items.length, {
		config: animationConfig,
		opacity: isVisible ? 1 : 0,
		x: animationDirection !== 'top' && animationDirection !== 'bottom'
			? isVisible
				? 0
				: animationDirection === 'right'
					? animationSpeed
					: -animationSpeed
			: 0,
		y: animationDirection !== 'right' && animationDirection !== 'left'
			? isVisible
				? 0
				: animationDirection === 'top'
					? -animationSpeed
					: animationSpeed
			: 0,
		delay: animationDelay,
		from: {
			opacity: 0,
			x: animationDirection !== 'top' && animationDirection !== 'bottom'
				? animationDirection === 'right'
					? animationSpeed
					: -animationSpeed
				: 0,
			height: 0
		}
	});

	return (
		<div ref={ containerRef }>
			{ trail.map(({ ...style }, index) => (
				<animated.div key={ index } style={ {
					...style, height: 'auto'
				} }>
					{ items[index] }
				</animated.div>
			)) }
		</div>
	);
}

export default Trail;
