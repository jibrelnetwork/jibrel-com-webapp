export interface PasswordResult {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export default async function checkPasswordStrength(password: string): Promise<PasswordResult> {
  const { default: zxcvbn } = await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')

  return zxcvbn(password)
}