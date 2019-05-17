import {combineReducers} from 'redux'

import {domReducer} from './dom'
import {eventsReducer} from './events'
import {iframesReducer} from './iframes'
import {runReducer} from './run'

const testReducer = combineReducers({
  dom: domReducer,
  events: eventsReducer,
  iframes: iframesReducer,
  run: runReducer,
})

export type TStoreTest = ReturnType<typeof testReducer>

export default testReducer
