/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { useEffect, useRef } from 'react';
import { ChurchOfOurLady } from '../ChurchOfOurLady/ChurchOfOurLady.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '../../util/Typography/Typography.tsx';

export const MadeWithLoveInDresden = () => {
	const iconRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const svg = iconRef.current!.querySelector('svg');
		if (svg) {
			const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
			const linearGradient = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'linearGradient'
			);
			linearGradient.setAttribute('id', 'enby');
			linearGradient.setAttribute('x1', '0%');
			linearGradient.setAttribute('y1', '0%');
			linearGradient.setAttribute('x2', '0%');
			linearGradient.setAttribute('y2', '100%');

			const stops = [
				{
					offset: '0%', color: '#5BCEFA'
				},
				{
					offset: '20%', color: '#5BCEFA'
				},
				{
					offset: '20%', color: '#F5A9B8'
				},
				{
					offset: '40%', color: '#F5A9B8'
				},
				{
					offset: '40%', color: '#fff'
				},
				{
					offset: '60%', color: '#fff'
				},
				{
					offset: '60%', color: '#F5A9B8'
				},
				{
					offset: '80%', color: '#F5A9B8'
				},
				{
					offset: '80%', color: '#5BCEFA'
				},
				{
					offset: '100%', color: '#5BCEFA'
				}
			];

			stops.forEach(({ offset, color }) => {
				const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
				stop.setAttribute('offset', offset);
				stop.setAttribute('stop-color', color);
				linearGradient.appendChild(stop);
			});

			defs.appendChild(linearGradient);
			svg.prepend(defs);

			const path = svg.querySelector('path');
			if (path) {
				path.setAttribute('fill', 'url(#enby)');
			}
		}
	}, []);

	return (
		<Typography variant={ 'footer' }>
			{ 'Made with ' }
			<span ref={ iconRef }>
				<FontAwesomeIcon
					className={ 'heart-icon' }
					icon={ faHeart }
				/>
			</span>
			{ ' in Dresden ' }
			<ChurchOfOurLady />
		</Typography>
	);

}
