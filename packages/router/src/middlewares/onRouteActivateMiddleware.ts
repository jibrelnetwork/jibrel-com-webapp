import { Router, State } from 'router5'
import transitionPath from 'router5-transition-path'
import { MiddlewareFactory } from 'router5/types/types/router'

import { RouteEnhanced } from '../types'

type RouteMap<D> = {
  [name: string]: RouteEnhanced<D>;
}

function routesToMap<D> (
  routes: RouteEnhanced<D>[],
  prefix?: string,
): RouteMap<D> {
  return routes.reduce((
    memo: RouteMap<D>,
    route: RouteEnhanced<D>,
  ) => {
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
  }, {})
}

export function onRouteActivateMiddleware<D> (
  routes: RouteEnhanced<D>[],
): MiddlewareFactory {
  const routesMap = routesToMap(routes)

  return (
    router: Router,
    dependencies: D,
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
