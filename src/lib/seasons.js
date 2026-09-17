import { SEASON_TIMELINE } from '../data/seasonTimeline.js'

// Groups the chronological timeline by letter, alphabetically. Each group's
// seasons stay in chronological order.
export function seasonsByLetter() {
  const groups = new Map()
  for (const entry of SEASON_TIMELINE) {
    if (!groups.has(entry.code)) groups.set(entry.code, [])
    groups.get(entry.code).push(entry)
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, seasons]) => ({ code, seasons }))
}
