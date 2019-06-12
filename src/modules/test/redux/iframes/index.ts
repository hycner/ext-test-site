import {delay, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action} from '../../../../store'
import {testFail} from '../run'
import {testIframeAccessibility} from './tests'

const INIT = 'test/iframes'
const PENDING = 'test/iframes/PENDING'
const SUCCESS = 'test/iframes/SUCCESS'
const FAILURE = 'test/iframes/FAILURE'

type InitAction = {
  type: 'test/iframes'
}
type PendingAction = {
  type: 'test/iframes/PENDING'
}
type SuccessAction = {
  type: 'test/iframes/SUCCESS'
  payload: string[]
}
type FailureAction = {
  type: 'test/iframes/FAILURE'
  payload: Error
}

export function testIframes(): InitAction {
  return {type: INIT}
}
function testIframesPending(): PendingAction {
  return {type: PENDING}
}
function testIframesSuccess(errors: string[]): SuccessAction {
  return {type: SUCCESS, payload: errors}
}
function testIframesFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

export function* testIframesTask(): SagaIterator {
  yield put(testIframesPending())
  yield delay(1000)

  try {
    const errors: string[] = []

    errors.push(...testIframeAccessibility())

    if (errors.length) yield put(testFail())

    yield put(testIframesSuccess(errors))
  } catch (err) {
    yield put(testIframesFailure(err))
  }
}

export function* testIframesWatcher(): SagaIterator {
  yield takeEvery(INIT, testIframesTask)
}

type StoreTestIframes = Readonly<{
  data: {
    testErrors: string[]
  }
  isLoading: boolean
  error: Error | null
}>
const initialState: StoreTestIframes = {
  data: {
    testErrors: [],
  },
  isLoading: false,
  error: null,
}

export function iframesReducer(
  state: StoreTestIframes = initialState,
  action: Action
): StoreTestIframes {
  switch (action.type) {
    case PENDING:
      return {...state, isLoading: true, data: {testErrors: []}}
    case SUCCESS:
      const newState = {...state, isLoading: false}
      if (action.payload.length) {
        newState.data = {testErrors: [...newState.data.testErrors, ...action.payload]}
      }
      return newState
    case FAILURE:
      return {...state, error: action.payload, isLoading: false}
    default:
      return state
  }
}
