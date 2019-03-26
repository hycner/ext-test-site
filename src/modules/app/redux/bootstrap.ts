import {put, takeEvery} from 'redux-saga/effects';
import {SagaIterator} from 'redux-saga';

import {TAction} from '../../../store';
import {messageCallback} from '../../test/redux/events/tests';

const INIT = 'app/bootstrap';
const PENDING = 'app/bootstrap/PENDING';
const SUCCESS = 'app/bootstrap/SUCCESS';
const FAILURE = 'app/bootstrap/FAILURE';

type TInitAction = {
  type: 'app/bootstrap';
};
type TPendingAction = {
  type: 'app/bootstrap/PENDING';
};
type TSuccessAction = {
  type: 'app/bootstrap/SUCCESS';
};
type TFailureAction = {
  type: 'app/bootstrap/FAILURE';
  payload: Error;
};

export function bootstrap(): TInitAction {
  return {type: INIT};
}
function bootstrapPending(): TPendingAction {
  return {type: PENDING};
}
function bootstrapSuccess(): TSuccessAction {
  return {type: SUCCESS};
}
function bootstrapFailure(error: Error): TFailureAction {
  return {
    type: FAILURE,
    payload: error,
  };
}

function* bootstrapTask(): SagaIterator {
  yield put(bootstrapPending());

  try {
    window.addEventListener('message', messageCallback);

    yield put(bootstrapSuccess());
  } catch (err) {
    yield put(bootstrapFailure(err));
  }
}

export function* bootstrapWatcher(): SagaIterator {
  yield takeEvery(INIT, bootstrapTask);
}

type TStoreAppBootstrap = {
  isDone: boolean;
};
const initialState: TStoreAppBootstrap = {
  isDone: false,
};

export function bootstrapReducer(
  state: TStoreAppBootstrap = initialState,
  action: TAction
): TStoreAppBootstrap {
  switch (action.type) {
    case SUCCESS:
    case FAILURE:
      return {isDone: true};
    default:
      return state;
  }
}
