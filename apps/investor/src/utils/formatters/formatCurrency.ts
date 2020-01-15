export default function formatCurrency(
  value: number,
  languageCode = 'en-US',
  currency = 'USD',
  options: Intl.NumberFormatOptions = {},
): string {
  const formatter = new Intl.NumberFormat(languageCode, {
    currency,
    style: 'currency',
    ...options,
  })

  return formatter.format(value)
}
