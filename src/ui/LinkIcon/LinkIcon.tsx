/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconLookup } from '@fortawesome/fontawesome-svg-core';
import Link from '@/ui/Link';
import { colors, media } from '@/styles';


/** TODO: */
type IconProps = {
    size: number
    hoverColor: string
}

/** TODO: */
const Icon = styled(FontAwesomeIcon)<IconProps>`
    font-size: ${props => props.size}vw;
	color: ${colors.white};
    transition: all 500ms ease;
    mix-blend-mode: difference;
    z-index: 3;

	${media.belowDesktop} {
		font-size: ${props => props.size*2.5}vw;
	}

	${media.wide} {
		font-size: ${props => (props.size / 100) * Math.min(window.innerWidth, 2000)}px;
	}

    &:hover {
        mix-blend-mode: normal;
        color: ${props => props.hoverColor};
    }
`;

/** TODO: */
type LinkIconProps = {
	/** TODO: */
	href: string
	/** TODO: */
    icon: IconLookup
	/** TODO: */
    size: number
    /** TODO: */
    hoverColor: string
}

/**
 * LinkIcon component.
 * @param {LinkIconProps} props - The props for the LinkIcon component.
 * @returns {JSX.Element} LinkIcon JSX element.
 */
export const LinkIcon = ({
	href = '#',
	icon = {
		prefix: 'fab', iconName: 'github'
	},
	size = 3,
	hoverColor = colors.accentPink
}: LinkIconProps ): JSX.Element => (
	<Link href={ href }>
		<Icon icon={ icon } size={ size } hoverColor={ hoverColor }/>
	</Link>
);