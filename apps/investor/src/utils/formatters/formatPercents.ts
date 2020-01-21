export default function formatPercents(
  value: number | string,
  languageCode = 'en-US',
  options: Intl.NumberFormatOptions = {},
): string {
  const formatter = new Intl.NumberFormat(languageCode, {
    style: 'percent',
    ...options,
  })

  return formatter.format((parseInt(value.toString(), 10) || 0) / 100)
}
