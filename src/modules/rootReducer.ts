import {combineReducers} from 'redux'

import app from './app/redux'
import test from './test/redux'

const rootReducer = combineReducers({
  app,
  test,
})

export type TStore = ReturnType<typeof rootReducer>

export default rootReducer
