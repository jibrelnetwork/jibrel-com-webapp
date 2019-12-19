import React, { useState } from 'react'

import KYCLayout from 'layouts/KYCLayout'

import style from './style.scss'
import { KYCType } from './types'

import {
  Info,
  Button,
} from './components'

const KYC: React.FunctionComponent = () => {
  const [kycType, setKYCType] = useState(KYCType.empty)

  return (
    <KYCLayout title='What type of investor are you?' >
      <div className={style.main}>
        <div className={style.buttons}>
          <Button
            setKYCType={setKYCType}
            type={KYCType.individual}
            iconName='human'
            description='Use an individual account if you want to invest on behalf of yourself.'
            isActive={kycType === KYCType.individual}
          />
          <Button
            setKYCType={setKYCType}
            type={KYCType.organizational}
            iconName='case'
            description='Use an organizational account if you will invest on behalf of an accredited organization.'
            isActive={kycType === KYCType.organizational}
          />
        </div>
        <Info type={kycType} />
      </div>
    </KYCLayout>
  )
}

export default KYC
