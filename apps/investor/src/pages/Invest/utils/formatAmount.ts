import { LanguageCode } from '@jibrelcom/i18n'

import formatCurrency from 'utils/formatters/formatCurrency'

export default function formatAmount(
  amount: string | number,
  languageCode: LanguageCode,
): string {
  return formatCurrency(
    parseInt(amount.toString(), 10),
    languageCode,
    'USD', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  )
}
