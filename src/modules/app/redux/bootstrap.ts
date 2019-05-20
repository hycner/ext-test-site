import {put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action} from '../../../store'
import {messageCallback} from '../../test/redux/events/tests'

const INIT = 'app/bootstrap'
const PENDING = 'app/bootstrap/PENDING'
const SUCCESS = 'app/bootstrap/SUCCESS'
const FAILURE = 'app/bootstrap/FAILURE'

type InitAction = {
  type: 'app/bootstrap'
}
type PendingAction = {
  type: 'app/bootstrap/PENDING'
}
type SuccessAction = {
  type: 'app/bootstrap/SUCCESS'
}
type FailureAction = {
  type: 'app/bootstrap/FAILURE'
  payload: Error
}

export function bootstrap(): InitAction {
  return {type: INIT}
}
function bootstrapPending(): PendingAction {
  return {type: PENDING}
}
function bootstrapSuccess(): SuccessAction {
  return {type: SUCCESS}
}
function bootstrapFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

function* bootstrapTask(): SagaIterator {
  yield put(bootstrapPending())

  try {
    window.addEventListener('message', messageCallback)

    yield put(bootstrapSuccess())
  } catch (err) {
    yield put(bootstrapFailure(err))
  }
}

export function* bootstrapWatcher(): SagaIterator {
  yield takeEvery(INIT, bootstrapTask)
}

type StoreAppBootstrap = {
  isDone: boolean
}
const initialState: StoreAppBootstrap = {
  isDone: false,
}

export function bootstrapReducer(
  state: StoreAppBootstrap = initialState,
  action: Action
): StoreAppBootstrap {
  switch (action.type) {
    case SUCCESS:
    case FAILURE:
      return {isDone: true}
    default:
      return state
  }
}
