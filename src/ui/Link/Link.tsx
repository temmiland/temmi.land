/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

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

const linkStyles = css`
	transition: color 0.5s;

	&:hover {
		color: #8B8B8B;
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

export const Link = ({
	children = 'This is a link.',
	href = '#',
	target,
	rel,
	className,
	onClick
}: LinkProps) => {
	if (isInternalRoute(href)) {
		return (
			<RouterA
				to={ href }
				target={ target }
				rel={ rel }
				className={ className }
				onClick={ onClick }
			>
				{ children }
			</RouterA>
		);
	}

	return (
		<A
			href={ href }
			target={ target }
			rel={ rel }
			className={ className }
			onClick={ onClick }
		>
			{ children }
		</A>
	);
};
