import {combineReducers} from 'redux'

import {bootstrapReducer} from './bootstrap'

const appReducer = combineReducers({
  bootstrap: bootstrapReducer,
})

export type StoreApp = ReturnType<typeof appReducer>

export default appReducer
