import React from 'react'

import {
  PageTitle,
} from '@jibrelcom/ui'

import CoreLayout from 'layouts/CoreLayout'

const Portfolio: React.FunctionComponent = () => {
  return (
    <CoreLayout>
      <PageTitle>
        My Portfolio
      </PageTitle>
      <PageTitle>
        Available Balance
      </PageTitle>
    </CoreLayout>
  )
}

export default Portfolio
