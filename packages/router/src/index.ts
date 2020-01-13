import browserPlugin from 'router5-plugin-browser'

import createRouter, {
  Route,
  Router,
} from 'router5'

import { setLangCookie } from './middlewares/setLangCookie'
import { onRouteActivateMiddleware } from './middlewares/onRouteActivateMiddleware'

export default function init(routes: Route[]): Router {
  const router = createRouter(routes, {
    allowNotFound: true,
  })

  router.usePlugin(browserPlugin())
  router.useMiddleware(onRouteActivateMiddleware(routes))
  router.useMiddleware(setLangCookie)

  return router
}
