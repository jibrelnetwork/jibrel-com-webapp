export default function formatDate(
  value: Date | string | number,
  languageCode = 'en-US',
  options: Intl.DateTimeFormatOptions = {},
): string {
  const formatter = new Intl.DateTimeFormat(languageCode, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })

  return formatter.format(new Date(value))
}
