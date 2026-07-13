/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { keyframes } from 'styled-components';
import { colors } from '@/styles';

const pulse = keyframes`
	0%, 100% { opacity: 0.2; }
	50% { opacity: 0.8; }
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 60vh;
`;

const Dot = styled.span`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: ${colors.gray};
	animation: ${pulse} 1.2s ease-in-out infinite;
`;

/**
 * Suspense fallback shown while a route chunk loads. Replaces a blank
 * `fallback={null}` screen, which on slow connections left the page
 * visibly empty with no feedback on the first visit to a route.
 */
export const PageLoader = () => (
	<Wrapper>
		<Dot />
	</Wrapper>
);
