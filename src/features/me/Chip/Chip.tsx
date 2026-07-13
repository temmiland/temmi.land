/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import { colors, fonts, media } from '@/styles';

const ChipTag = styled.span<{ color: string }>`
	display: inline-block;
	box-sizing: border-box;
	margin: 0;
	padding: 0.8vw;
	width: fit-content;
	font-family: ${fonts.regular};
	font-size: 2.0vw;
	border-radius: 1vw;
	line-height: 1.1vw;
	border: 1px solid transparent;
	color: ${colors.white};
	white-space: nowrap;
	background-color: ${(props) => props.color};

	${media.belowDesktop} {
		font-size: 5vw;
		border-radius: 2vw;
		padding: 1.5vw;
		margin: 0 0 1.5vw 0;
		line-height: 4vw;
	}

	${media.wide} {
		padding: 16px;
		font-size: 40px;
		border-radius: 20px;
		line-height: 22px;
	}

	svg {
		font-size: 1.6vw;
		margin-right: 0.8vw;

		${media.belowDesktop} {
			font-size: 4.25vw;
			margin: 0.3vw 1.3vw 0.3vw 0.5vw;
		}

		${media.wide} {
			font-size: 32px;
			margin-right: 16px;
		}
	}

	span {
		line-height: 0.78vw;
	}
`;

/**
 * Props for a chip.
 */
type ChipProps = {
	/** The background color to be displayed. */
	color: string;
	/** The Font Awesome icon name to be displayed. */
	iconName: IconName;
	/** The text content. */
	text: string;
}

/**
 * Chip component.
 * @param {ChipProps} props - The props for the Chip component.
 * @returns {JSX.Element} Chip JSX element.
 */
export const Chip = ({
	color = colors.accentBlue,
	iconName = 'mug-hot',
	text = 'Frontend Developer'
}: ChipProps): JSX.Element => (
	<ChipTag color={ color }>
		<FontAwesomeIcon icon={ iconName } />
		<span>{ text }</span>
	</ChipTag>
);