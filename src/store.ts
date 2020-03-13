import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/rootReducer'
import sagas from './modules/rootSagas'

const sagaMiddleware = createSagaMiddleware()

let middleware = [
  sagaMiddleware,
  createLogger({
    collapsed: true,
  }),
]

let store = createStore(rootReducer, applyMiddleware(...middleware))

sagaMiddleware.run(sagas)

export default store
export let dispatch = store.dispatch

// Abstract types

export type Action = {
  type: string
  payload?: any
}

export type AsyncState = {
  error: string | null | undefined
  isLoading: boolean
}
