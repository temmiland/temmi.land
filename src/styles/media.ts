/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * The site's breakpoints. Use these instead of repeating raw
 * `@media (min-width: …)` queries in every styled-component:
 *
 * ```ts
 * const Box = styled.div`
 *     padding: ${fluid(1.4)};
 *
 *     ${media.mobile} {
 *         padding: 5vw;
 *     }
 * `;
 * ```
 */
export const media = {
	/** Phones: up to 600px (also covers very small screens below 320px). */
	mobile: '@media (max-width: 599.98px)',

	/** Tablets: 600px – 1024px. */
	tablet: '@media (min-width: 600px) and (max-width: 1023.98px)',

	/** Phones and tablets combined: up to 1024px. */
	belowDesktop: '@media (max-width: 1023.98px)',

	/** Desktop: 1024px – 2000px. */
	desktop: '@media (min-width: 1024px) and (max-width: 1999.98px)',

	/** Very wide screens: at and above the 2000px layout cap. */
	wide: '@media (min-width: 2000px)'
} as const;

/**
 * A viewport-relative size that stops growing at the 2000px layout cap.
 *
 * The design scales everything with `vw` and freezes it above 2000px, where
 * `1vw` equals `20px`. `fluid(1.1)` therefore renders exactly like the old
 * pattern of `1.1vw` plus a `@media (min-width: 2000px) { … 22px }` override,
 * but in a single declaration.
 *
 * @param vw The size in `vw` for viewports up to 2000px.
 * @returns A CSS `min()`/`max()` expression capping the value at 2000px.
 */
export const fluid = (vw: number): string => {
	const px = Math.round(vw * 20 * 1000) / 1000;

	return vw >= 0 ? `min(${vw}vw, ${px}px)` : `max(${vw}vw, ${px}px)`;
};
