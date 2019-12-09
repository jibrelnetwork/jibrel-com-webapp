import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { routes } from './routes'

import { setLangCookie } from './middlewares/setLangCookie'

export const router = createRouter(routes, {
  allowNotFound: true,
})

router.usePlugin(browserPlugin())
router.useMiddleware(setLangCookie)
