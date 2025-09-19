/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import React, { ReactNode } from 'react';
import { animated, useTrail } from 'react-spring';

const Trail: React.FC<{
	scrollY: number,
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
	scrollY,
	visible,
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

	if (scrollY < 0) scrollY = 0;

	const vis: { min: number, max: number } = (() => {
		const viewportSize = window.innerWidth;
		if (viewportSize >= 320 && viewportSize <= 600) {
			return {
				min: visible.min.phone, max: visible.max.phone
			};
		} else if (viewportSize <= 1024) {
			return {
				min: visible.min.tablet, max: visible.max.tablet
			};
		} else if (viewportSize <= 2000) {
			return {
				min: visible.min.desktop, max: visible.max.desktop
			};
		} else {
			return {
				min: visible.min.oversize, max: visible.max.oversize
			};
		}
	})();

	const calculateVisibilityForCurrentViewport = () => {
		if(document.body.scrollHeight >= window.innerHeight) {
			const height = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			);
			// 1512 is the document height on 'default'-viewport design
			// is used here to calc the new breakpoints
			return {
				min: vis.min / 1512 * height,
				max: vis.max / 1512 * height
			}
		}
		return {
			min: 0,
			max: Infinity
		}
	}

	const scrollYInBetween = () => (
		scrollY >= calculateVisibilityForCurrentViewport().min
			&& scrollY <= calculateVisibilityForCurrentViewport().max
	);

	const items = React.Children.toArray(children);
	const trail = useTrail(items.length, {
		config: animationConfig,
		opacity: scrollYInBetween()
			? 1
			: 0,
		x: animationDirection !== 'top' && animationDirection !== 'bottom'
			? scrollYInBetween()
				? 0
				: animationDirection === 'right'
					? animationSpeed
					: -animationSpeed
			: 0,
		y: animationDirection !== 'right' && animationDirection !== 'left'
			? scrollYInBetween()
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

	return trail.map(({ ...style }, index) => (
		<animated.div key={ index } style={ {
			...style, height: 'auto'
		} }>
			{ items[index] }
		</animated.div>
	))
}

export default Trail;