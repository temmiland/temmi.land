/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors, fonts, media, whiteAlpha } from '@/styles';

const SearchInputWrapper = styled.div`
	position: relative;
	max-width: 39vw;

	svg {
		position: absolute;
		top: 50%;
		left: 1vw;
		transform: translateY(-50%);
		color: ${whiteAlpha(0.5)};
		font-size: 0.9vw;
		pointer-events: none;
	}

	input {
		box-sizing: border-box;
		width: 100%;
		padding: 1.1vw 2.6vw;
		border: 0.075vw solid ${whiteAlpha(0.35)};
		border-radius: 2.6vw;
		background: ${whiteAlpha(0.06)};
		color: ${colors.white};
		font-family: ${fonts.medium};
		font-size: 0.9vw;
		transition: 100ms linear;

		&::placeholder {
			color: ${whiteAlpha(0.45)};
		}

		&:focus {
			outline: none;
			border-color: ${whiteAlpha(0.6)};
			background: ${whiteAlpha(0.1)};
		}
	}

	.clear-search {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1em;
		height: 1em;
		position: absolute;
		top: 50%;
		right: 0.9vw;
		transform: translateY(-50%);
		color: ${whiteAlpha(0.5)};
		font-size: 0.9vw;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;

		&:hover {
			color: ${colors.white};
		}
	}

	${media.mobile} {
		max-width: 100%;

		svg {
			left: 3.5vw;
			font-size: 3.5vw;
		}

		input {
			padding: 4vw 9vw;
			border: 0.25vw solid ${whiteAlpha(0.35)};
			border-radius: 8vw;
			font-size: 3.25vw;
		}

		.clear-search {
			right: 3vw;
			font-size: 3.25vw;
		}
	}

	${media.tablet} {
		max-width: 100%;

		svg {
			left: 1.5vw;
			font-size: 2vw;
		}

		input {
			padding: 1.8vw 4vw;
			border: 0.125vw solid ${whiteAlpha(0.35)};
			border-radius: 4vw;
			font-size: 2vw;
		}

		.clear-search {
			right: 1.5vw;
			font-size: 2vw;
		}
	}

	${media.wide} {
		max-width: 780px;

		svg {
			left: 14px;
			font-size: 18px;
		}

		input {
			padding: 20px 38px;
			border: 1px solid ${whiteAlpha(0.35)};
			border-radius: 52px;
			font-size: 18px;
		}

		.clear-search {
			right: 12px;
			font-size: 16px;
		}
	}
`;

type SearchInputProps = {
	/** Current search text. */
	value: string;
	/** Called with the new text on every keystroke, and with '' on clear. */
	onChange: (value: string) => void;
	/** Placeholder shown when the input is empty. */
	placeholder: string;
};

/**
 * Glass-styled search input with a leading magnifying-glass icon and a
 * trailing clear button that appears once there's text to clear.
 * @param {SearchInputProps} props - The props for the SearchInput component.
 * @returns {JSX.Element} SearchInput JSX element.
 */
export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => (
	<SearchInputWrapper>
		<FontAwesomeIcon icon={ ['fas', 'magnifying-glass'] } />
		<input
			type={ 'text' }
			value={ value }
			placeholder={ placeholder }
			onChange={ (event) => onChange(event.target.value) }
		/>
		{ value ? (
			<button
				type={ 'button' }
				className={ 'clear-search' }
				onClick={ () => onChange('') }
			>
				<FontAwesomeIcon icon={ ['fas', 'xmark'] } />
			</button>
		) : null }
	</SearchInputWrapper>
);
