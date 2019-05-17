import {all} from 'redux-saga/effects'

import {bootstrapWatcher} from './redux/bootstrap'

export default function* app() {
  yield all([bootstrapWatcher()])
}
