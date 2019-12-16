export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4

export type CheckPasswordStrengthHandler = (
  password: string,
  userInputs?: string[],
) => Promise<PasswordStrengthScore>

export enum IndicatorStatus {
  weak = 'weak',
  normal = 'normal',
  good = 'good',
  strong = 'strong',
  fetching = 'fetching',
}
