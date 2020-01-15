export enum AvailableSlugs {
  arabot = 'arabot',
  maqsam = 'maqsam',
  addenda = 'addenda',
}

export enum AvailableSources {
  main = 'main',
  invest = 'invest',
  portfolio = 'portfolio',
}

const AVAILABLE_SLUGS = [
  'arabot',
  'maqsam',
  'addenda',
]

const AVAILABLE_SOURCES = [
  'main',
  'invest',
  'portfolio',
]

export default function checkRedirectParams({
  source,
  slug,
}: Record<string, any>): boolean {
  if (source && !AVAILABLE_SOURCES.includes(source)) {
    return false
  } else if (slug && !AVAILABLE_SLUGS.includes(slug)) {
    return false
  }

  return true
}
