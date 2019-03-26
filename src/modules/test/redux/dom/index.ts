import {delay, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';

import {TAction} from '../../../../store';
import {testFail} from '../run';
import {testIframeNodeLeaks} from './tests';

const INIT = 'test/dom';
const PENDING = 'test/dom/PENDING';
const SUCCESS = 'test/dom/SUCCESS';
const FAILURE = 'test/dom/FAILURE';

type TInitAction = {
  type: 'test/dom';
};
type TPendingAction = {
  type: 'test/dom/PENDING';
};
type TSuccessAction = {
  type: 'test/dom/SUCCESS';
  payload: string[];
};
type TFailureAction = {
  type: 'test/dom/FAILURE';
  payload: Error;
};

export function testDom(): TInitAction {
  return {type: INIT};
}
function testDomPending(): TPendingAction {
  return {type: PENDING};
}
function testDomSuccess(errors: string[]): TSuccessAction {
  return {
    type: SUCCESS,
    payload: errors,
  };
}
function testDomFailure(error: Error): TFailureAction {
  return {
    type: FAILURE,
    payload: error,
  };
}

export function* testDomTask(): SagaIterator {
  yield put(testDomPending());
  yield delay(1000);

  try {
    const errors = [];

    errors.push(...testIframeNodeLeaks());

    if (errors.length) yield put(testFail());

    yield put(testDomSuccess(errors));
  } catch (err) {
    yield put(testDomFailure(err));
  }
}

export function* testDomWatcher(): SagaIterator {
  yield takeEvery(INIT, testDomTask);
}

type TStoreTestDom = {
  data: {
    testErrors: string[];
  };
  isLoading: boolean;
  error: Error | null;
};
const initialState: TStoreTestDom = {
  data: {
    testErrors: [],
  },
  isLoading: false,
  error: null,
};

export function domReducer(state: TStoreTestDom = initialState, action: TAction): TStoreTestDom {
  switch (action.type) {
    case PENDING:
      return {...state, isLoading: true, data: {testErrors: []}};
    case SUCCESS:
      const newState = {...state, isLoading: false};
      if (action.payload.length) {
        newState.data = {testErrors: [...newState.data.testErrors, ...action.payload]};
      }
      return newState;
    case FAILURE:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
}
