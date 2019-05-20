import {all} from 'redux-saga/effects'

import app from './app'
import settings from './settings'
import test from './test'

export default function* rootSaga() {
  yield all([app(), settings(), test()])
}
