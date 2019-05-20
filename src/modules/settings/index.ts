import {all} from 'redux-saga/effects'

import {setWatcher} from './redux'

export default function* app() {
  yield all([setWatcher()])
}
