import { init, RematchRootState } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'

import * as models from './models'

const loadingPlugin = createLoadingPlugin()

const store = init({
  models,
  plugins: [loadingPlugin],
})

export default store

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models>

export { default as axios } from './axios'
