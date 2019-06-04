import {put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
import localforage from 'localforage'

import {Action} from '../../../store'

const INIT = 'settings/set/INIT'
const COMMIT = 'settings/set/COMMIT'

type InitActionPayload = {
  section: 'address' | 'creditCard' | 'login' | 'all'
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
export function setSettingsCommit(payload: StoreSettings): CommitAction {
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

export type StoreSettingsAddress = {
  areIdsUnique: boolean
  hasEmail: boolean
  hasPhone: boolean
  isForm: boolean
  isIframeField: boolean
  isIframeSection: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
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
  address: StoreSettingsAddress
  creditCard: StoreSettingsCreditCard
  login: StoreSettingsLogin
  [section: string]: Object
}
const initialState: StoreSettings = {
  address: {
    areIdsUnique: true,
    hasEmail: false,
    hasPhone: false,
    isForm: false,
    isIframeField: false,
    isIframeSection: false,
    isMultiButton: false,
    isVisible: false,
    iterations: 1,
  },
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
