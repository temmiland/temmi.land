/**
 * Copyright (C) 2026 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

/**
 * Central design tokens. Import these instead of hardcoding colors or font
 * stacks in styled-components so a design change only has to happen here.
 */
export const colors = {
	/** Page background. */
	black: '#000000',

	/** Background of the hero / me section. */
	surfaceDark: '#050404',

	/** Default section surface. */
	surface: '#141414',

	/** Elevated surface (cards, chips on dark ground). */
	surfaceLight: '#222222',

	/** Primary text and headings. */
	white: '#ffffff',

	/** Text on light (glass) surfaces. */
	ink: '#1a1a1a',

	/** Muted / secondary text. */
	gray: '#8b8b8b',

	/** Blue accent (icons, links, highlights). */
	accentBlue: '#80cee1',

	/** Pink accent (icons, highlights). */
	accentPink: '#d698a1',

	/** Soft rose accent. */
	accentRose: '#f5a9b8',

	/** Soft sky accent. */
	accentSky: '#5bcefa'
} as const;

/**
 * Translucent white tones used for borders and glass surfaces.
 * @param alpha The opacity between 0 and 1.
 * @returns An rgba() color string.
 */
export const whiteAlpha = (alpha: number): string =>
	`rgba(255, 255, 255, ${alpha})`;

const withFallback = (name: string): string =>
	`'${name}', system-ui, Avenir, Helvetica, Arial, sans-serif`;

/**
 * Font stacks including fallbacks. The Fraunces faces are registered via
 * `@font-face` in `index.css`.
 */
export const fonts = {
	light: withFallback('Fraunces Light'),
	regular: withFallback('Fraunces Regular'),
	medium: withFallback('Fraunces Medium'),
	bold: withFallback('Fraunces Bold')
} as const;
