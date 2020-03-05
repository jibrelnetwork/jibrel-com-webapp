import { PhoneDomain } from './domain'
import * as events from './events'
import { $PhoneStore } from './store'
import * as types from './types'
import * as utils from './utils'

export default {
  domain: PhoneDomain,
  store: $PhoneStore,
  events,
  types,
  utils
}
