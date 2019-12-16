export default async function checkPasswordStrength(
  password: string,
  userInputs?: string[],
): Promise<zxcvbn.ZXCVBNScore> {
  const { default: zxcvbn } = await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')

  const result: zxcvbn.ZXCVBNResult = zxcvbn(password, userInputs)

  return result.score
}
