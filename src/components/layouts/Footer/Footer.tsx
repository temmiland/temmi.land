/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { useEffect, useState } from 'react';
import WFooter from '../../widgets/Footer';
import Trail from '../../components/util/Trail';

export const Footer = () => {

	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		window.addEventListener('scroll', () => setScrollY(
			document.body.scrollHeight - window.innerHeight	- document.body.scrollTop
		), true);
	});

	return (
		<Trail
			scrollY={ scrollY }
			visible={ {
				min: {
					phone: 0,
					tablet: 0,
					desktop: 0,
					oversize: 0
				},
				max: {
					phone: 50,
					tablet: 50,
					desktop: 100,
					oversize: 100
				}
			} }
			animationDirection={ 'bottom' }
			animationSpeed={ 50 }
		>
			<div>
				<WFooter />
			</div>
		</Trail>
	);
};
