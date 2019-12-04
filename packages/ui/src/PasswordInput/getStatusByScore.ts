import { IndicatorStatus } from './types'

export default function getStatusByScore(score: number): IndicatorStatus | null {
  switch (score) {
    case 0:
    case 1:
      return IndicatorStatus.weak
    case 2:
      return IndicatorStatus.normal
    case 3:
      return IndicatorStatus.good
    case 4:
      return IndicatorStatus.strong
    default:
      return null
  }
}
