export default function formatDate(
  value: number | Date,
  languageCode = 'en-US',
  options: Intl.DateTimeFormatOptions = {},
): string {
  const formatter = new Intl.DateTimeFormat(languageCode, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })

  return formatter.format(value)
}
