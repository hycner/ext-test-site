import {delay, put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action} from '../../../../store'
import {testFail} from '../run'
import {testEventHijacking} from './tests'

const INIT = 'test/events'
const PENDING = 'test/events/PENDING'
const SUCCESS = 'test/events/SUCCESS'
const FAILURE = 'test/events/FAILURE'

type InitAction = {
  type: 'test/events'
}
type PendingAction = {
  type: 'test/events/PENDING'
}
type SuccessAction = {
  type: 'test/events/SUCCESS'
  payload: string[]
}
type FailureAction = {
  type: 'test/events/FAILURE'
  payload: Error
}

export function testEvents(): InitAction {
  return {type: INIT}
}
function testEventsPending(): PendingAction {
  return {type: PENDING}
}
function testEventsSuccess(errors: string[]): SuccessAction {
  return {
    type: SUCCESS,
    payload: errors,
  }
}
function testEventsFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

// TODO: finish this saga
export function* testEventsTask(): SagaIterator {
  yield put(testEventsPending())
  yield delay(1000)

  try {
    const existingErrors = yield select(state => state.data.testErrors)
    const errors: string[] = []

    // errors.push(...testEventHijacking());

    if (errors.length) yield put(testFail())
    if (existingErrors.length) yield put(testFail())

    yield put(testEventsSuccess(errors))
  } catch (err) {
    yield put(testEventsFailure(err))
  }
}

export function* testEventsWatcher(): SagaIterator {
  yield takeEvery(INIT, testEventsTask)
}

// test fail

const EVENT_CAUGHT = 'test/events/event-caught'

type EventCaughtAction = {
  type: 'test/events/event-caught'
  payload: string
}

export function messageEventCaught(): EventCaughtAction {
  return {
    type: EVENT_CAUGHT,
    payload: `Message event caught at ${new Date().toLocaleTimeString()}`,
  }
}

type StoreTestEvents = Readonly<{
  data: {
    testErrors: string[]
  }
  isLoading: boolean
  error: Error | null
}>
const initialState: StoreTestEvents = {
  data: {
    testErrors: [],
  },
  isLoading: false,
  error: null,
}

export function eventsReducer(
  state: StoreTestEvents = initialState,
  action: Action
): StoreTestEvents {
  switch (action.type) {
    case PENDING:
      return {...state, isLoading: true}
    case SUCCESS:
      return {...state, isLoading: false}
    case FAILURE:
      return {...state, error: action.payload, isLoading: false}
    case EVENT_CAUGHT:
      return {
        ...state,
        data: {
          testErrors: [...state.data.testErrors, action.payload],
        },
      }
    default:
      return state
  }
}
