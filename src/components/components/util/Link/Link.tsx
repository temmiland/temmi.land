/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { Typography as Typo } from 'antd';

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
}

const A = styled(Typo.Link)`
	.ant-typography {
		transition: color 0.5s;
	}

	&:hover {
		.ant-typography {
			color: #8B8B8B;
			mix-blend-mode: difference;
			z-index: 3;
		}
	}

`;

export const Link = ({ children = 'This is a link.', href = '#' }: LinkProps) => {
	return <A href={ href }>{ children }</A>;
};
