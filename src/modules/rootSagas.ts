import {all} from 'redux-saga/effects';

import app from './app';
import test from './test';

export default function* rootSaga() {
  yield all([app(), test()]);
}
