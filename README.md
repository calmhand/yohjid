# Yohjid

A live product-code decoder for Yohji Yamamoto pieces. Type in the 8-character code from a garment's tag and it decodes the clothing line, season, type, cut/shape, and material as you type.

## How it works

Yohji Yamamoto product codes follow the format `LS-TCC-MMM`:

| Segment | Meaning |
|---|---|
| `L` | Clothing line (e.g. `H` = Pour Homme) |
| `S` | Season |
| `T` | Clothing type (e.g. `J` = Jacket) |
| `CC` | Cut/shape |
| `MMM` | Material |

**Season decoding is the hard part.** The season letter isn't a 1:1 mapping — the same letter is reused across many different years with no predictable pattern (e.g. `V` alone could mean 1994, 2001, 2009, 2018, or 2022). So instead of a simple lookup, the decoder:

1. Finds every year/season a given letter could mean
2. Narrows that list using three optional era signals you can supply:
   - **Logo style** — rounded (pre-AW1991) vs. sharp-edged (post-SS1992)
   - **Sizing tag** — lettered S/M/L (pre-AW1999) vs. numbered 1/2/3 (post-SS2000)
   - **Laundry icon position** — bottom of tag (pre-AW2016) vs. top (post-SS2017)
3. Shows a single resolved season if the signals narrow it down to one match, or the remaining candidates if they don't

`S'yte` is special-cased — per the source reference material, it doesn't follow the standard season table at all.

## Project structure

```
src/
├── App.jsx / App.css     — UI: code input, disambiguation controls, live results
├── lib/decode.js         — parsing + season-candidate resolution logic
└── data/
    ├── clothingLines.js  — line letter → name (complete)
    ├── clothingTypes.js  — type letter → name (complete)
    ├── seasonTimeline.js — full 1992–2026 season letter timeline (complete)
    ├── cutShapes.js      — cut/shape code → name (empty — no key table published yet)
    └── materials.js      — material code → name (empty — no key table published yet)
```

## Running locally

```bash
npm install
npm run dev
```

## Known gaps

- **Cut/shape and material codes** aren't mapped yet — no reference key table exists for these two segments. The decoder shows the raw digits with a "not mapped yet" placeholder until that data is available.

## Stack

React + Vite, no backend — everything runs client-side.
