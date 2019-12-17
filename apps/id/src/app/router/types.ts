import { Route } from 'router5'
import { Store } from 'store'

export interface RouteEnhanced extends Route {
  onActivate?: (
    params: object,
    dependencies: RouterDependencies,
  ) => Promise<void>;
}

export interface RouterDependencies {
  store: Store;
}
