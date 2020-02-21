import React, { useEffect } from 'react'
import cc from 'classcat'
import COUNTRIES_TITLES from '@jibrelcom/countries/src/en.common.json'
import { connect } from 'react-redux'
import { useI18n } from '@jibrelcom/i18n'
import { CountryRef } from '@jibrelcom/countries/src/types'

import { Customer } from 'store/types/invest'

import {
  Dispatch,
  RootState,
} from 'store'

import {
  Loader,
  LoaderColor,
} from '@jibrelcom/ui'

import style from './style.scss'
import investStyle from '../../style.scss'

export interface CustomerDataProps {
  getCustomerData: () => void;
  customerData: Customer;
  isCustomerDataLoading: boolean;
}

const CustomerData: React.FunctionComponent<CustomerDataProps> = ({
  getCustomerData,
  customerData,
  isCustomerDataLoading,
}) => {
  useEffect(() => {
    getCustomerData()
  }, [])

  const i18n = useI18n()
  const isLoading = !customerData || isCustomerDataLoading

  return (
    <div className={cc([style.data, isLoading && style.loading])}>
      {isLoading ? <Loader color={LoaderColor.gray} /> : (
        <>
          <div className={style.item}>
            <div className={investStyle.label}>
              {i18n._('Invest.CustomerData.name')}
            </div>
            <div className={investStyle.value}>
              <p>{customerData.name}</p>
            </div>
          </div>
          <div className={style.item}>
            <div className={investStyle.label}>
              {i18n._('Invest.CustomerData.address')}
            </div>
            <div className={investStyle.value}>
              <p>{customerData.streetAddress}</p>
              <p>{customerData.apartment}</p>
              <p>{customerData.city}</p>
              <p>{customerData.postCode}</p>
              <p>{COUNTRIES_TITLES[CountryRef[customerData.country]]}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    customerData: state.invest.customerData,
    isCustomerDataLoading: state.invest.isCustomerDataLoading,
  }),
  (dispatch: Dispatch) => ({
    getCustomerData: dispatch.invest.getCustomerData,
  })
)(CustomerData)
