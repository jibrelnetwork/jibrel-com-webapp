export default function formatPercents(
  value: number | string,
  languageCode = 'en-US',
  options: Intl.NumberFormatOptions = {},
): string {
  const formatter = new Intl.NumberFormat(languageCode, options)

  return `${formatter.format(parseInt(value.toString(), 10))}%`
}
