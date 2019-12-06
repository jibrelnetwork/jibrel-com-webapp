import { init, RematchRootState } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import thunkMiddleware from 'redux-thunk'

import * as models from './models'

const loadingPlugin = createLoadingPlugin({
  name: 'isLoading',
})

const store = init({
  redux: {
    middlewares: [thunkMiddleware],
  },
  models,
  plugins: [loadingPlugin],
})

export default store

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models>
