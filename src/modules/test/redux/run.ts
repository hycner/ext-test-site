import {call, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action} from '../../../store'
import {testEventsTask} from './events'
import {testIframesTask} from './iframes'
import {testDomTask} from './dom'

// run

const INIT = 'test/run'
const PENDING = 'test/run/PENDING'
const SUCCESS = 'test/run/SUCCESS'
const FAILURE = 'test/run/FAILURE'

type InitAction = {
  type: 'test/run'
}
type PendingAction = {
  type: 'test/run/PENDING'
}
type SuccessAction = {
  type: 'test/run/SUCCESS'
}
type FailureAction = {
  type: 'test/run/FAILURE'
  payload: Error
}

export function runTests(): InitAction {
  return {type: INIT}
}
function runTestsPending(): PendingAction {
  return {type: PENDING}
}
function runTestsSuccess(): SuccessAction {
  return {type: SUCCESS}
}
function runTestsFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

function* runTestsTask(): SagaIterator {
  yield put(runTestsPending())

  try {
    console.log('runTestsTask')

    yield call(testIframesTask)
    yield put(increment())
    yield call(testDomTask)
    yield put(increment())
    yield call(testEventsTask)

    yield put(runTestsSuccess())
  } catch (err) {
    yield put(runTestsFailure(err))
  }
}

export function* runTestsWatcher(): SagaIterator {
  yield takeEvery(INIT, runTestsTask)
}

// increment

const INCREMENT = 'test/run/increment'

type IncrementAction = {
  type: 'test/run/increment'
}

function increment(): IncrementAction {
  return {type: INCREMENT}
}

// test fail

const TEST_FAIL = 'test/run/test-fail'

type TestFailAction = {
  type: 'test/run/test-fail'
}

export function testFail(): TestFailAction {
  return {type: TEST_FAIL}
}

type StoreTestRun = {
  data: {
    currentTest: number
    hasFailedTest: boolean
    hasRun: boolean
  }
  isLoading: boolean
  error: Error | null
}
const initialState: StoreTestRun = {
  data: {
    currentTest: 0,
    hasFailedTest: false,
    hasRun: false,
  },
  isLoading: false,
  error: null,
}

export function runReducer(state: StoreTestRun = initialState, action: Action): StoreTestRun {
  switch (action.type) {
    case PENDING:
      return {
        ...state,
        isLoading: true,
        data: {
          currentTest: 1,
          hasFailedTest: false,
          hasRun: true,
        },
      }
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          currentTest: 0,
        },
      }
    case FAILURE:
      return {
        isLoading: false,
        error: action.payload,
        data: {
          ...state.data,
          currentTest: 0,
        },
      }
    case INCREMENT:
      return {
        ...state,
        data: {
          ...state.data,
          currentTest: state.data.currentTest + 1,
        },
      }
    case TEST_FAIL:
      return {
        ...state,
        data: {
          ...state.data,
          hasFailedTest: true,
        },
      }
    default:
      return state
  }
}
