/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { RefObject, useEffect, useRef, useState } from 'react';

type UseDropdownResult = {
	/** Whether the dropdown panel is currently open. */
	isOpen: boolean;
	/** Toggles the open state, e.g. from the trigger button's onClick. */
	toggle: () => void;
	/** Closes the dropdown, e.g. after an option has been selected. */
	close: () => void;
	/** Attach to the element wrapping both the trigger and the panel. */
	ref: RefObject<HTMLDivElement>;
};

/**
 * Open/close state for a single dropdown menu, closing automatically on a
 * click outside the wrapping element. Each dropdown gets its own instance,
 * so opening one never affects another's state.
 * @returns {UseDropdownResult} The dropdown's open state and controls.
 */
export const useDropdown = (): UseDropdownResult => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!ref.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	return {
		isOpen,
		toggle: () => setIsOpen((prev) => !prev),
		close: () => setIsOpen(false),
		ref
	};
};
