import { CLOTHING_LINES } from '../data/clothingLines.js'
import { CLOTHING_TYPES } from '../data/clothingTypes.js'
import { CUT_SHAPES } from '../data/cutShapes.js'
import { MATERIALS } from '../data/materials.js'
import { SEASON_TIMELINE } from '../data/seasonTimeline.js'

// Orders (year, season) chronologically so era cutoffs can be compared with < / >=.
function seasonSortKey(year, season) {
  return year * 2 + (season === 'Autumn/Winter' ? 1 : 0)
}

const CUTOFFS = {
  logoRounded: seasonSortKey(1991, 'Autumn/Winter'), // strictly before -> rounded Y
  logoSharp: seasonSortKey(1992, 'Spring/Summer'), // at/after -> sharp Y
  sizingLettered: seasonSortKey(1999, 'Autumn/Winter'), // strictly before -> S/M/L tag
  sizingNumbered: seasonSortKey(2000, 'Spring/Summer'), // at/after -> 1/2/3 tag
  laundryBottom: seasonSortKey(2016, 'Autumn/Winter'), // strictly before -> icons at bottom
  laundryTop: seasonSortKey(2017, 'Spring/Summer'), // at/after -> icons at top
}

// Season letters repeat across years (see SEASON_TIMELINE), so a letter
// resolves to a list of candidate years, narrowed by whichever
// disambiguation signals the caller supplies. Any signal left out is
// simply not used to filter.
function resolveSeason(letter, signals, isSyte) {
  if (isSyte) {
    return {
      letter,
      candidates: [],
      resolved: null,
      note: "S'yte does not follow the standard season table — season can't be resolved from this chart alone.",
    }
  }

  let candidates = SEASON_TIMELINE.filter((entry) => entry.code === letter)

  if (signals.logo === 'rounded') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) < CUTOFFS.logoRounded)
  } else if (signals.logo === 'sharp') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) >= CUTOFFS.logoSharp)
  }

  if (signals.sizing === 'lettered') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) < CUTOFFS.sizingLettered)
  } else if (signals.sizing === 'numbered') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) >= CUTOFFS.sizingNumbered)
  }

  if (signals.laundry === 'bottom') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) < CUTOFFS.laundryBottom)
  } else if (signals.laundry === 'top') {
    candidates = candidates.filter((e) => seasonSortKey(e.year, e.season) >= CUTOFFS.laundryTop)
  }

  return {
    letter,
    candidates,
    resolved: candidates.length === 1 ? candidates[0] : null,
  }
}

// Decodes as much of an 8-character product code as has been typed so far.
// Format (dashes optional, stripped before parsing): L S - T C C - M M M
//   L    = clothing line   (CLOTHING_LINES)
//   S    = season          (SEASON_TIMELINE, many-to-one, needs signals)
//   T    = clothing type   (CLOTHING_TYPES)
//   CC   = cut/shape       (CUT_SHAPES, no key table yet)
//   MMM  = material        (MATERIALS, no key table yet)
export function decode(rawCode, signals = {}) {
  const code = (rawCode || '').replace(/-/g, '').toUpperCase()

  const result = {
    raw: rawCode ?? '',
    normalized: code,
    line: null,
    season: null,
    type: null,
    cutShape: null,
    material: null,
  }

  if (code.length >= 1) {
    const letter = code[0]
    result.line = { letter, name: CLOTHING_LINES[letter] ?? null }
  }

  if (code.length >= 2) {
    const letter = code[1]
    const isSyte = result.line?.letter === 'U'
    result.season = resolveSeason(letter, signals, isSyte)
  }

  if (code.length >= 3) {
    const letter = code[2]
    result.type = { letter, name: CLOTHING_TYPES[letter] ?? null }
  }

  if (code.length >= 5) {
    const digits = code.slice(3, 5)
    result.cutShape = { code: digits, name: CUT_SHAPES[digits] ?? null }
  }

  if (code.length >= 8) {
    const digits = code.slice(5, 8)
    result.material = { code: digits, name: MATERIALS[digits] ?? null }
  }

  return result
}
