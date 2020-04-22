import {combineReducers} from 'redux'

import app from './app/redux'
import settings from './settings/redux'

const rootReducer = combineReducers({
  app,
  settings,
})

export type Store = ReturnType<typeof rootReducer>

export default rootReducer
