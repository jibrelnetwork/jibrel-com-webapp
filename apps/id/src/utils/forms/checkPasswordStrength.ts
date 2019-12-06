export default async function checkPasswordStrength(password: string): Promise<zxcvbn.ZXCVBNScore> {
  const { default: zxcvbn } = await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')

  const result: zxcvbn.ZXCVBNResult = zxcvbn(password)

  return result.score
}
