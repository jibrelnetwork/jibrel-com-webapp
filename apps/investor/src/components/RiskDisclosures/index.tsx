import React from 'react'
import cc from 'classcat'
import { useLanguageCode } from '@jibrelcom/i18n'

import templates from './lang'

import style from './style.scss'

interface RiskDisclosuresProps {
  className?: string;
}

const RiskDisclosures: React.FunctionComponent<RiskDisclosuresProps> = ({ className }) => {
  const language = useLanguageCode()

  return (
      <article className={cc([style.container, className])} dangerouslySetInnerHTML={{ __html: templates[language] }} />
  )
}

export default React.memo(RiskDisclosures)
