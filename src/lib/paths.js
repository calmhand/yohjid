export const BASE = import.meta.env.BASE_URL

export function withBase(path) {
  return `${BASE}${path.replace(/^\//, '')}`
}
