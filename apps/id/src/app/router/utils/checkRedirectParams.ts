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

const AVAILABLE_NEXT_PAGES = [
  'main',
  'invest',
  'portfolio',
]

export default function checkRedirectParams({
  next,
  slug,
}: Record<string, any>): boolean {
  if (next && !AVAILABLE_NEXT_PAGES.includes(next)) {
    return false
  } else if (slug && !AVAILABLE_SLUGS.includes(slug)) {
    return false
  }

  return true
}
