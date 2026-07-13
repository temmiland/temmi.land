/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '@/styles';

interface LinkProps {
	/**
	 * React children prop
	 */
	children: React.ReactNode;
	/**
	 * Link location
	 */
	href: string;
	target?: string;
	rel?: string;
	className?: string;
	onClick?: (event: React.MouseEvent) => void;
}

/**
 * Resets the browser's default link appearance (blue, underlined) so every
 * consumer starts from a neutral state and decides its own look for the
 * context it's used in (nav, footer, body text, ...) instead of the
 * component forcing one. The hover snaps to gray on a short transition,
 * matching the body-text link hover in Typography's `P` variant, rather
 * than the previous 0.5s fade that read as barely-there.
 */
const linkStyles = css`
	color: inherit;
	text-decoration: none;
	transition: color 150ms ease;

	&:hover {
		color: ${colors.gray};
	}
`;

const A = styled.a`
	${linkStyles}
`;

const RouterA = styled(RouterLink)`
	${linkStyles}
`;

/**
 * Hrefs that point within this app (start with `/`) are navigated
 * client-side via react-router, unless they target an in-page anchor
 * (`/#section`) — those still need a real page load so the browser's native
 * hash-scroll runs when arriving from a different route.
 */
const isInternalRoute = (href: string) => href.startsWith('/') && !href.includes('#');

export const Link = ({ children, href, target, rel, className, onClick }: LinkProps) => {
	if (isInternalRoute(href)) {
		return (
			<RouterA to={href} target={target} rel={rel} className={className} onClick={onClick}>
				{children}
			</RouterA>
		);
	}

	return (
		<A href={href} target={target} rel={rel} className={className} onClick={onClick}>
			{children}
		</A>
	);
};
