/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDropdown from '@/ui/Dropdown';
import { colors, fonts, media, whiteAlpha } from '@/styles';

const FilterRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.55vw;
	padding: 0 6.5vw;
	margin: 1vw 0;

	${media.mobile} {
		display: none;
	}

	${media.tablet} {
		gap: 1.2vw;
	}

	${media.wide} {
		gap: 11px;
		margin: 20px 0;
	}
`;

const Chip = styled.button`
	flex-shrink: 0;
	white-space: nowrap;
	appearance: none;
	cursor: pointer;
	font-family: ${fonts.medium};
	font-size: 0.9vw;
	color: ${colors.white};
	background: ${whiteAlpha(0.08)};
	border: 0.07vw solid ${whiteAlpha(0.16)};
	border-radius: 999px;
	padding: 0.5vw 1.1vw;
	backdrop-filter: blur(0.7vw);
	-webkit-backdrop-filter: blur(0.7vw);
	transition: 120ms ease;

	&:hover {
		background: ${whiteAlpha(0.16)};
		border-color: ${whiteAlpha(0.32)};
	}

	&.active {
		color: ${colors.surface};
		background: ${colors.white};
		border-color: ${colors.white};
	}

	${media.tablet} {
		font-size: 2vw;
		padding: 0.85vw 1.75vw;
		border: 0.125vw solid ${whiteAlpha(0.16)};
	}

	${media.wide} {
		font-size: 18px;
		padding: 10px 22px;
		border: 1px solid ${whiteAlpha(0.16)};
	}
`;

const FilterDropdown = styled.div`
	display: none;

	${media.mobile} {
		display: block;
		position: relative;
		padding: 0 6.5vw;
		margin: 1vw 0;
	}
`;

const DropdownTrigger = styled.button`
	display: inline-flex;
	align-items: center;
	max-width: 100%;
	gap: 1.5vw;
	box-sizing: border-box;
	appearance: none;
	cursor: pointer;
	font-family: ${fonts.medium};
	font-size: 3.25vw;
	color: ${colors.white};
	background: ${whiteAlpha(0.06)};
	border: 0.25vw solid ${whiteAlpha(0.35)};
	border-radius: 4vw;
	padding: 1.75vw 3.5vw;
	transition: 100ms linear;

	&.open {
		color: ${colors.black};
		background: ${colors.white};
	}

	span {
		display: flex;
		align-items: center;
		gap: 2vw;
	}

	.caret {
		transition: transform 120ms ease;
	}

	&.open .caret {
		transform: rotate(180deg);
	}
`;

const DropdownPanel = styled.div`
	position: absolute;
	top: calc(100% + 1vw);
	left: 6.5vw;
	right: 6.5vw;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 1vw;
	padding: 1.5vw;
	background: linear-gradient(135deg, rgba(30, 30, 30, 0.97) 0%, rgba(20, 20, 20, 0.97) 100%);
	border: 0.25vw solid ${whiteAlpha(0.16)};
	border-radius: 3.5vw;
	box-shadow: 0 2vw 6vw rgba(0, 0, 0, 0.4);

	button {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 2vw 2.5vw;
		border: none;
		border-radius: 2vw;
		background: transparent;
		color: ${colors.white};
		cursor: pointer;
		text-align: left;
		font-family: ${fonts.medium};
		font-size: 3.25vw;
		transition: 100ms linear;

		&:hover {
			background: ${whiteAlpha(0.12)};
		}

		&.active {
			background: ${whiteAlpha(0.16)};
			color: ${colors.accentBlue};
		}
	}
`;

/**
 * A single selectable filter option.
 */
export type FilterOption = {
	/** The value passed to onChange when this option is selected. */
	value: string;
	/** The label shown on the chip. */
	label: string;
};

/**
 * Props for the filter.
 */
type FilterProps = {
	/** The selectable options, excluding the built-in "clear filter" chip. */
	options: FilterOption[];
	/** The currently active value, or '' for no filter. */
	activeValue: string;
	/** Called with the newly selected value ('' clears the filter). */
	onChange: (value: string) => void;
	/** Label for the chip that clears the filter. */
	allLabel?: string;
};

/**
 * Filter component. Renders a wrapping row of glass chips used to filter a
 * list by a single active value at a time. On phone viewports (<600px) it
 * collapses into a single dropdown, matching the Sort/Export dropdowns used
 * alongside it.
 * @param {FilterProps} props - The props for the Filter component.
 * @returns {JSX.Element} Filter JSX element.
 */
export const Filter = ({
	options,
	activeValue,
	onChange,
	allLabel = 'All'
}: FilterProps): JSX.Element => {
	const { isOpen, toggle, close, ref: menuRef } = useDropdown();

	const activeLabel = activeValue
		? options.find((option) => option.value === activeValue)?.label ?? allLabel
		: allLabel;

	return (
		<>
			<FilterRow>
				<Chip
					type={ 'button' }
					className={ activeValue === '' ? 'active' : '' }
					onClick={ () => onChange('') }
				>
					{ allLabel }
				</Chip>
				{ options.map((option) => (
					<Chip
						key={ option.value }
						type={ 'button' }
						className={ activeValue === option.value ? 'active' : '' }
						onClick={ () => onChange(option.value) }
					>
						{ option.label }
					</Chip>
				)) }
			</FilterRow>
			<FilterDropdown ref={ menuRef }>
				<DropdownTrigger
					type={ 'button' }
					className={ isOpen ? 'open' : '' }
					onClick={ toggle }
				>
					<span>
						<FontAwesomeIcon icon={ ['fas', 'filter'] } />
						{ activeLabel }
					</span>
					<FontAwesomeIcon className={ 'caret' } icon={ ['fas', 'caret-down'] } />
				</DropdownTrigger>
				{ isOpen ? (
					<DropdownPanel>
						<button
							type={ 'button' }
							className={ activeValue === '' ? 'active' : '' }
							onClick={ () => {
								onChange('');
								close();
							} }
						>
							{ allLabel }
						</button>
						{ options.map((option) => (
							<button
								key={ option.value }
								type={ 'button' }
								className={ activeValue === option.value ? 'active' : '' }
								onClick={ () => {
									onChange(option.value);
									close();
								} }
							>
								{ option.label }
							</button>
						)) }
					</DropdownPanel>
				) : null }
			</FilterDropdown>
		</>
	);
};
