import {call, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {TAction} from '../../../store'
import {testEventsTask} from './events'
import {testIframesTask} from './iframes'
import {testDomTask} from './dom'

// run

const INIT = 'test/run'
const PENDING = 'test/run/PENDING'
const SUCCESS = 'test/run/SUCCESS'
const FAILURE = 'test/run/FAILURE'

type TInitAction = {
  type: 'test/run'
}
type TPendingAction = {
  type: 'test/run/PENDING'
}
type TSuccessAction = {
  type: 'test/run/SUCCESS'
}
type TFailureAction = {
  type: 'test/run/FAILURE'
  payload: Error
}

export function runTests(): TInitAction {
  return {type: INIT}
}
function runTestsPending(): TPendingAction {
  return {type: PENDING}
}
function runTestsSuccess(): TSuccessAction {
  return {type: SUCCESS}
}
function runTestsFailure(error: Error): TFailureAction {
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

type TIncrementAction = {
  type: 'test/run/increment'
}

function increment(): TIncrementAction {
  return {type: INCREMENT}
}

// test fail

const TEST_FAIL = 'test/run/test-fail'

type TTestFailAction = {
  type: 'test/run/test-fail'
}

export function testFail(): TTestFailAction {
  return {type: TEST_FAIL}
}

type TStoreTestRun = {
  data: {
    currentTest: number
    hasFailedTest: boolean
    hasRun: boolean
  }
  isLoading: boolean
  error: Error | null
}
const initialState: TStoreTestRun = {
  data: {
    currentTest: 0,
    hasFailedTest: false,
    hasRun: false,
  },
  isLoading: false,
  error: null,
}

export function runReducer(state: TStoreTestRun = initialState, action: TAction): TStoreTestRun {
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
