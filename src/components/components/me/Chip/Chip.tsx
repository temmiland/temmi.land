/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Tag } from 'antd';

/**
 * Custom styles for antd Tag component.
 */
const ChipTag = styled(Tag)`
	margin: 0;
	padding: 0.8vw !important;
	width: fit-content;
	font-family: Bogart Regular, system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 2.0vw !important;
	border-radius: 1vw;
	line-height: 1.1vw;

	@media (min-width: 320px) and (max-width: 1024px) {
		font-size: 5vw !important;
		border-radius: 2vw;
		padding: 1.5vw !important;
		margin: 0 0 1.5vw 0;
		line-height: 4vw;
	}

	@media (min-width: 2000px) {
		padding: 16px !important;
		font-size: 40px !important;
		border-radius: 20px;
		line-height: 22px !important;
	}

	svg {
		font-size: 1.6vw;
		margin-right: 0.8vw;

		@media (min-width: 320px) and (max-width: 1024px) {
			font-size: 4.25vw;
			margin: 0.3vw 1.3vw 0.3vw 0.5vw;
		}

		@media (min-width: 2000px) {
			font-size: 32px;
			margin-right: 16px;
		}
	}

	span {
		background-color: ${props => props.color} !important;
		line-height: 0.78vw !important;
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
	color = '#80cee1',
	iconName = 'mug-hot',
	text = 'Frontend Developer'
}: ChipProps): JSX.Element => (
	<ChipTag
		icon={
			<FontAwesomeIcon icon={ iconName } />
		}
		bordered={ false }
		color={ color }
	>
		{ text }
	</ChipTag>
);