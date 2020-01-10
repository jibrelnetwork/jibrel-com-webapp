import { Route } from 'router5'

export interface RouteEnhanced<D> extends Route {
  onActivate?: (
    params: object,
    dependencies: D,
  ) => Promise<void>;
}
