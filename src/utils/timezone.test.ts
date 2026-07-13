/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import { describe, expect, it } from 'vitest';
import { getTimezoneOffsetMinutes } from './timezone';

describe('getTimezoneOffsetMinutes', () => {
	it('returns 0 for UTC', () => {
		expect(getTimezoneOffsetMinutes('UTC', new Date('2026-01-15T12:00:00Z'))).toBe(0);
	});

	it('returns +60 for Berlin in winter (CET)', () => {
		expect(getTimezoneOffsetMinutes('Europe/Berlin', new Date('2026-01-15T12:00:00Z'))).toBe(60);
	});

	it('returns +120 for Berlin in summer (CEST, DST)', () => {
		expect(getTimezoneOffsetMinutes('Europe/Berlin', new Date('2026-07-15T12:00:00Z'))).toBe(120);
	});

	it('returns a negative offset for timezones west of UTC', () => {
		expect(getTimezoneOffsetMinutes('America/New_York', new Date('2026-01-15T12:00:00Z'))).toBe(-300);
	});

	it('returns a non-hour-aligned offset for timezones with a half-hour offset', () => {
		expect(getTimezoneOffsetMinutes('Asia/Kolkata', new Date('2026-01-15T12:00:00Z'))).toBe(330);
	});
});
