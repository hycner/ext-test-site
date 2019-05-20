import {combineReducers} from 'redux'

import app from './app/redux'
import settings from './settings/redux'
import test from './test/redux'

const rootReducer = combineReducers({
  app,
  settings,
  test,
})

export type Store = ReturnType<typeof rootReducer>

export default rootReducer
