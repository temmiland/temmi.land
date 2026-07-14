/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * The site's breakpoints in px, single source of truth for both the CSS
 * `media` queries below and JS layout math (e.g. `ProjectGrid`'s column
 * count) that needs to react to the same viewport boundaries — see
 * `columnsForWidth`.
 */
export const breakpoints = {
	/** Below this width: mobile (1 column). */
	mobile: 600,
	/**
	 * At/below this width: tablet (2 columns); above: desktop (4 columns).
	 * Inclusive because an iPad Pro 12.9" in portrait is exactly 1024px wide
	 * and must still get the tablet layout, not the desktop one.
	 */
	tablet: 1024,
	/** At/above this width: the layout cap where fluid() stops scaling. */
	wide: 2000
} as const;

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
	mobile: `@media (max-width: ${breakpoints.mobile - 0.02}px)`,

	/** Tablets: 600px – 1024px (inclusive). */
	tablet: `@media (min-width: ${breakpoints.mobile}px) and (max-width: ${breakpoints.tablet}px)`,

	/** Phones and tablets combined: up to and including 1024px. */
	belowDesktop: `@media (max-width: ${breakpoints.tablet}px)`,

	/** Desktop: above 1024px, up to 2000px. */
	desktop: `@media (min-width: ${breakpoints.tablet + 0.02}px) and (max-width: ${breakpoints.wide - 0.02}px)`,

	/** Very wide screens: at and above the 2000px layout cap. */
	wide: `@media (min-width: ${breakpoints.wide}px)`
} as const;

/**
 * Number of `ExpandableGrid` columns at a given viewport width, mirroring the
 * `mobile`/`tablet`/`wide` breakpoints above so JS layout math can't drift
 * from the CSS breakpoints the way it used to (each hard-coded its own copy).
 */
export const columnsForWidth = (width: number): number => {
	if (width < breakpoints.mobile) {
		return 1;
	}
	if (width <= breakpoints.tablet) {
		return 2;
	}
	return 4;
};

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
