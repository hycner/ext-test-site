import {combineReducers} from 'redux'

import app from './app/redux'
import customization from './customization/redux'
import test from './test/redux'

const rootReducer = combineReducers({
  app,
  customization,
  test,
})

export type TStore = ReturnType<typeof rootReducer>

export default rootReducer
