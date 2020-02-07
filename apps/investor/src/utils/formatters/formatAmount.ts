export default function formatAmount(
  value: number,
  languageCode = 'en-US',
  options: Intl.NumberFormatOptions = {},
): string {
  const formatter = new Intl.NumberFormat(languageCode, options)

  return formatter.format(value)
}
