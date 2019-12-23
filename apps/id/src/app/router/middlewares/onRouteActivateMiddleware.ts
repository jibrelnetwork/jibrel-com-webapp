import { Router, State } from 'router5'
import transitionPath from 'router5-transition-path'

import {
  RouteEnhanced,
  RouterDependencies,
} from '../types'
import { MiddlewareFactory } from 'router5/types/types/router'

type RouteMap = {
  [name: string]: RouteEnhanced;
}

const routesToMap = (
  routes: RouteEnhanced[],
  prefix?: string,
): RouteMap =>
  routes.reduce(
    (memo: RouteMap, route) => {
      const name = prefix
        ? `${prefix}.${route.name}`
        : route.name

      memo[name] = route
      if (route.children) {
        Object.assign(
          memo,
          routesToMap(route.children, name),
        )
      }

      return memo
    },
    {},
  )


export const onRouteActivateMiddleware = (
  routes: RouteEnhanced[],
): MiddlewareFactory => {
  const routesMap = routesToMap(routes)

  return (
    router: Router,
    dependencies: RouterDependencies,
  ) => (
    toState: State,
    fromState: State,
    done: () => void,
  ): void => {
    const { toActivate } = transitionPath(toState, fromState)

    toActivate
      .reduce((p, segment) => {
        const routeSegment = routesMap[segment]

        if (routeSegment && routeSegment.onActivate) {
          return p.then(() =>
            routeSegment.onActivate(toState.params, dependencies)
          )
        }

        return p
      }, Promise.resolve())
      .then(() => done())
  }
}
