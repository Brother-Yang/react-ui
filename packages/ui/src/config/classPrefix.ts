let CLASS_PREFIX = 'zephyr-'

function normalizePrefix(prefix: string) {
  const p = prefix || 'zephyr-'
  return p.endsWith('-') ? p : `${p}-`
}

export function getClassPrefix() {
  return CLASS_PREFIX
}

export function setClassPrefix(prefix: string) {
  CLASS_PREFIX = normalizePrefix(prefix)
}

export function withPrefix(name: string) {
  const base = `zephyr-${name}`
  const current = `${CLASS_PREFIX}${name}`
  if (CLASS_PREFIX === 'zephyr-') return base
  return `${base} ${current}`
}
