import {
  State,
  Router,
  ActivationFnFactory,
} from 'router5'

import settings from 'app/settings'

import { RouterDependencies } from '../types'

const isLoggedIn: ActivationFnFactory = (
  router: Router,
  dependencies: RouterDependencies,
) => async (toState: State): Promise<boolean> => {
  const { store } = dependencies

  try {
    await store.dispatch.user.updateProfile()
  } catch (error) {
    // we will check result below
  }

  const { user } = store.getState()

  if (user.status) {
    return true
  }

  const idDomain = settings.ID_ORIGIN
  const params = `next=invest&slug=${toState.params.slug || ''}`
  window.location.href = `${idDomain}/${user.languageCode}/login?${params}`

  return false
}

export default isLoggedIn
