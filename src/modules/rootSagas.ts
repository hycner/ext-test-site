import {all} from 'redux-saga/effects'

import app from './app'
import settings from './settings'

export default function* rootSaga() {
  yield all([app(), settings()])
}
