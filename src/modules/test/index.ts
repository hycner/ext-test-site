import {all} from 'redux-saga/effects';

import {testDomWatcher} from './redux/dom';
import {runTestsWatcher} from './redux/run';
import {testIframesWatcher} from './redux/iframes';

export default function* test() {
  yield all([runTestsWatcher(), testDomWatcher(), testIframesWatcher()]);
}
