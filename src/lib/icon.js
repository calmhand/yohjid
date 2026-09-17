// Vite inlines small SVGs as data URIs containing spaces and quotes, so the
// url() must be quoted or the mask declaration is invalid in production.
export function iconStyle(src) {
  return { '--icon': `url("${src}")` }
}
