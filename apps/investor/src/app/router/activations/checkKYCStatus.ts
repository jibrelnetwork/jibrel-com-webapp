import {
  Router,
  ActivationFnFactory,
} from 'router5'

import { UserStatus } from 'store/types'

import { RouterDependencies } from '../types'

const checkKYCStatus: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) =>
  async (): Promise<boolean> => {
    const { store } = dependencies
    const { user } = store.getState()

    if (user.status === UserStatus.PENDING) {
      return Promise.reject({
        redirect: {
          name: 'Pending',
        }
      })
    } else if (user.status !== UserStatus.VERIFIED) {
      return Promise.reject({
        redirect: {
          name: 'Unverified',
        }
      })
    }

    return Promise.resolve(true)
  }

export default checkKYCStatus
