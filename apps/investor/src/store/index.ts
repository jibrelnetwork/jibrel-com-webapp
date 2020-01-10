import selectPlugin from '@rematch/select'
import createLoadingPlugin from '@rematch/loading'
import { router5Middleware } from 'redux-router5'

import {
  init,
  RematchRootState,
} from '@rematch/core'

import { router } from 'app/router'

import * as models from './models'

const store = init({
  models,
  plugins: [
    createLoadingPlugin(),
    selectPlugin(),
  ],
  redux: {
    middlewares: [
      router5Middleware(router),
    ],
  },
})

export default store

export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models>
