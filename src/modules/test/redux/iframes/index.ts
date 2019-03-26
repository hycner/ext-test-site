import {delay, put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';

import {TAction} from '../../../../store';
import {testFail} from '../run';
import {testIframeAccessibility} from './tests';

const INIT = 'test/iframes';
const PENDING = 'test/iframes/PENDING';
const SUCCESS = 'test/iframes/SUCCESS';
const FAILURE = 'test/iframes/FAILURE';

type TInitAction = {
  type: 'test/iframes';
};
type TPendingAction = {
  type: 'test/iframes/PENDING';
};
type TSuccessAction = {
  type: 'test/iframes/SUCCESS';
  payload: string[];
};
type TFailureAction = {
  type: 'test/iframes/FAILURE';
  payload: Error;
};

export function testIframes(): TInitAction {
  return {type: INIT};
}
function testIframesPending(): TPendingAction {
  return {type: PENDING};
}
function testIframesSuccess(errors: string[]): TSuccessAction {
  return {type: SUCCESS, payload: errors};
}
function testIframesFailure(error: Error): TFailureAction {
  return {
    type: FAILURE,
    payload: error,
  };
}

export function* testIframesTask(): SagaIterator {
  yield put(testIframesPending());
  yield delay(1000);

  try {
    const errors: string[] = [];

    errors.push(...testIframeAccessibility());

    if (errors.length) yield put(testFail());

    yield put(testIframesSuccess(errors));
  } catch (err) {
    yield put(testIframesFailure(err));
  }
}

export function* testIframesWatcher(): SagaIterator {
  yield takeEvery(INIT, testIframesTask);
}

type TStoreTestIframes = {
  data: {
    testErrors: string[];
  };
  isLoading: boolean;
  error: Error | null;
};
const initialState: TStoreTestIframes = {
  data: {
    testErrors: [],
  },
  isLoading: false,
  error: null,
};

export function iframesReducer(
  state: TStoreTestIframes = initialState,
  action: TAction
): TStoreTestIframes {
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
