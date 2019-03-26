import {delay, put, select, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';

import {TAction} from '../../../../store';
import {testFail} from '../run';
import {testEventHijacking} from './tests';

const INIT = 'test/events';
const PENDING = 'test/events/PENDING';
const SUCCESS = 'test/events/SUCCESS';
const FAILURE = 'test/events/FAILURE';

type TInitAction = {
  type: 'test/events';
};
type TPendingAction = {
  type: 'test/events/PENDING';
};
type TSuccessAction = {
  type: 'test/events/SUCCESS';
  payload: string[];
};
type TFailureAction = {
  type: 'test/events/FAILURE';
  payload: Error;
};

export function testEvents(): TInitAction {
  return {type: INIT};
}
function testEventsPending(): TPendingAction {
  return {type: PENDING};
}
function testEventsSuccess(errors: string[]): TSuccessAction {
  return {
    type: SUCCESS,
    payload: errors,
  };
}
function testEventsFailure(error: Error): TFailureAction {
  return {
    type: FAILURE,
    payload: error,
  };
}

// TODO: finish this saga
export function* testEventsTask(): SagaIterator {
  yield put(testEventsPending());
  yield delay(1000);

  try {
    const existingErrors = yield select(state => state.data.testErrors);
    const errors: string[] = [];

    // errors.push(...testEventHijacking());

    if (errors.length) yield put(testFail());
    if (existingErrors.length) yield put(testFail());

    yield put(testEventsSuccess(errors));
  } catch (err) {
    yield put(testEventsFailure(err));
  }
}

export function* testEventsWatcher(): SagaIterator {
  yield takeEvery(INIT, testEventsTask);
}

// test fail

const EVENT_CAUGHT = 'test/events/event-caught';

type TEventCaughtAction = {
  type: 'test/events/event-caught';
  payload: string;
};

export function messageEventCaught(): TEventCaughtAction {
  return {
    type: EVENT_CAUGHT,
    payload: `Message event caught at ${new Date().toLocaleTimeString()}`,
  };
}

type TStoreTestEvents = {
  data: {
    testErrors: string[];
  };
  isLoading: boolean;
  error: Error | null;
};
const initialState: TStoreTestEvents = {
  data: {
    testErrors: [],
  },
  isLoading: false,
  error: null,
};

export function eventsReducer(
  state: TStoreTestEvents = initialState,
  action: TAction
): TStoreTestEvents {
  switch (action.type) {
    case PENDING:
      return {...state, isLoading: true};
    case SUCCESS:
      return {...state, isLoading: false};
    case FAILURE:
      return {...state, error: action.payload, isLoading: false};
    case EVENT_CAUGHT:
      return {
        ...state,
        data: {
          testErrors: [...state.data.testErrors, action.payload],
        },
      };
    default:
      return state;
  }
}
