import React, { Component } from 'react'
import cc from 'classcat'
import { connect } from 'react-redux'

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
  getCustomerData: (id: string) => void;
  customerData: Customer;
  slug: string;
  isCustomerDataLoading: boolean;
}

class CustomerData extends Component<CustomerDataProps> {
  componentDidMount(): void {
    const {
      getCustomerData,
      slug,
    }: CustomerDataProps = this.props

    getCustomerData(slug)
  }

  render(): React.ReactNode {
    const {
      customerData,
      isCustomerDataLoading,
    }: CustomerDataProps = this.props

    return (
      <div className={cc([style.data, isCustomerDataLoading && style.loading])}>
        {!customerData || isCustomerDataLoading ? <Loader color={LoaderColor.gray} /> : (
          <>
            <div className={style.item}>
              <div className={investStyle.label}>
                Full Legal Name
              </div>
              <div className={investStyle.value}>
                <p>{customerData.name}</p>
              </div>
            </div>
            <div className={style.item}>
              <div className={investStyle.label}>
                Address
              </div>
              <div className={investStyle.value}>
                <p>{customerData.streetAddress}</p>
                <p>{customerData.apartment}</p>
                <p>{customerData.city}</p>
                <p>{customerData.postCode}</p>
                <p>{customerData.country}</p>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
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
