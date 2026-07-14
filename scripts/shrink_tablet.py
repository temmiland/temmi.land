#!/usr/bin/env python3
"""
Uniformly scale the *content* vw values inside every ${media.tablet} block by
a factor k, leaving layout-defining dimensions (width/height/position) intact.

Because every scaled property stays a vw value, element ratios within the
content cluster are preserved exactly (they all shrink by the same k) — the
tablet band just renders at a smaller "zoom level". Structural widths (the
45vw tiles, the 2-column grid) are untouched so the layout can't break.

Usage: shrink_tablet.py <k> [--apply]
"""
import re, glob, sys

K = float(sys.argv[1])
APPLY = '--apply' in sys.argv
TAG = '${media.tablet}'

# Properties whose vw values scale with the text (the content cluster).
SCALE = {
    'font-size', 'line-height',
    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
    'gap', 'grid-column-gap', 'grid-row-gap', 'column-gap', 'row-gap',
    'border-radius', 'border-width', 'min-height',
    '--project-desc-margin', 'backdrop-filter', '-webkit-backdrop-filter',
    'box-shadow',
}
# Left untouched: width, height, min-width, max-width, top, bottom, left,
# right, background-size, background-position (define the layout grid).

def scale_vw(value):
    return re.sub(
        r'(-?\d*\.?\d+)vw',
        lambda m: f'{round(float(m.group(1)) * K, 3):g}vw',
        value,
    )

def tablet_spans(src):
    spans = []; i = 0
    while True:
        j = src.find(TAG, i)
        if j < 0: break
        k = src.find('{', j + len(TAG))
        depth = 0; m = k
        while m < len(src):
            if src[m] == '{': depth += 1
            elif src[m] == '}':
                depth -= 1
                if depth == 0: break
            m += 1
        spans.append((k + 1, m)); i = m + 1
    return spans

decl_re = re.compile(r'([\w-]+)(\s*:\s*)([^{};]*?)(\s*;)')

def transform_block(text):
    changes = []
    def repl(mm):
        prop, sep, val, semi = mm.groups()
        if prop in SCALE and re.search(r'-?\d*\.?\d+vw', val):
            new = scale_vw(val)
            if new != val:
                changes.append((prop, val.strip(), new.strip()))
                return prop + sep + new + semi
        return mm.group(0)
    return decl_re.sub(repl, text), changes

total = 0
for f in sorted(glob.glob('src/**/*.tsx', recursive=True)):
    src = open(f).read()
    spans = tablet_spans(src)
    if not spans: continue
    out = []; last = 0; file_changes = []
    for s, e in spans:
        out.append(src[last:s])
        new_block, ch = transform_block(src[s:e])
        out.append(new_block); file_changes += ch; last = e
    out.append(src[last:])
    if file_changes:
        total += len(file_changes)
        print(f"\n{f}")
        for prop, a, b in file_changes:
            print(f"  {prop}: {a}  ->  {b}")
        if APPLY:
            open(f, 'w').write(''.join(out))

print(f"\n{'APPLIED' if APPLY else 'DRY RUN'} k={K}: {total} declarations")
