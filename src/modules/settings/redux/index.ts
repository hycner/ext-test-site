import {put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
import localforage from 'localforage'

import {Action} from '../../../store'

const INIT = 'settings/set/INIT'
const COMMIT = 'settings/set/COMMIT'

type InitActionPayload = {
  section: 'login' | 'creditCard' | 'all'
  settings:
    | StoreSettings
    | {
        [option: string]: boolean | number
      }
}
type InitAction = {
  type: typeof INIT
  payload: InitActionPayload
}
type CommitAction = {
  type: typeof COMMIT
  payload: StoreSettings
}

export function setSettings(payload: InitActionPayload): InitAction {
  return {
    type: INIT,
    payload,
  }
}
function setSettingsCommit(payload: StoreSettings): CommitAction {
  return {
    type: COMMIT,
    payload,
  }
}

function* setTask(action: InitAction): SagaIterator {
  const state = yield select(state => state.settings)

  let newState
  if (action.payload.section === 'all') {
    newState = action.payload.settings
  } else {
    newState = {
      ...state,
      [action.payload.section]: {
        ...state[action.payload.section],
        ...action.payload.settings,
      },
    }
  }

  localforage.setItem('settings', newState)

  yield put(setSettingsCommit(newState))
}

export function* setWatcher(): SagaIterator {
  yield takeEvery(INIT, setTask)
}

export type StoreSettingsCreditCard = {
  areIdsUnique: boolean
  isForm: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
}
export type StoreSettingsLogin = {
  areIdsUnique: boolean
  isForm: boolean
  isMultiButton: boolean
  isThreeField: boolean
  isVisible: boolean
  iterations: number
}
export type StoreSettings = {
  creditCard: StoreSettingsCreditCard
  login: StoreSettingsLogin
  [section: string]: Object
}
const initialState: StoreSettings = {
  creditCard: {
    areIdsUnique: true,
    isForm: false,
    isMultiButton: false,
    isVisible: false,
    iterations: 1,
  },
  login: {
    areIdsUnique: true,
    isForm: false,
    isMultiButton: false,
    isThreeField: false,
    isVisible: false,
    iterations: 1,
  },
}

export default function settingsReducer(
  state: StoreSettings = initialState,
  action: Action
): StoreSettings {
  switch (action.type) {
    case COMMIT:
      return action.payload
    default:
      return state
  }
}
