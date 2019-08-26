import {put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action} from '../../../store'
import {db} from '../../../lib/database'

export type SectionTypes = 'address' | 'creditCard' | 'login' | 'passwordReset'

// ACTIONS

const INIT = 'settings/set/INIT'
const COMMIT = 'settings/set/COMMIT'
const RESET = 'settings/RESET'

type InitActionPayload = {
  section: SectionTypes | 'all'
  settings:
    | StoreSettings
    | {
        [option: string]: boolean | number | string
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
type ResetAction = {
  type: typeof RESET
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
export function resetSettings(): ResetAction {
  return {type: RESET}
}

// SAGAS

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

  db.setItem('settings', newState)

  yield put(setSettingsCommit(newState))
}

export function* setWatcher(): SagaIterator {
  yield takeEvery(INIT, setTask)
}

// REDUCERS

export type LocaleOptions = 'af' | 'en-US' | 'ja-JP'

type BaseSettings = Readonly<{
  areAttrIdentifying: boolean
  areIdsUnique: boolean
  isAdjacentInput: boolean
  isDeeperInput: boolean
  isFieldset: boolean
  isForm: boolean
  isIframeSection: boolean
  isInputNested: boolean
  isInputNestedWithDeepInput: boolean
  isInputNestedWithRandomText: boolean
  isInputNestedWithShallowInput: boolean
  isLabelled: boolean
  isLabelledOnlyText: boolean
  isLabelledWithFor: boolean
  isLocaleChanged: boolean
  isMultiButton: boolean
  isVisible: boolean
  isWrappedInDiv: boolean
  iterations: number
  locale: LocaleOptions
}>

export type StoreSettingsAddress = BaseSettings &
  Readonly<{
    hasEmail: boolean
    hasName: boolean
    hasPhone: boolean
    isIframeField: boolean
  }>
export type StoreSettingsCreditCard = BaseSettings & Readonly<{}>
export type StoreSettingsLogin = BaseSettings &
  Readonly<{
    is2FA: boolean
    isPassword: boolean
    isAccountId: boolean
    isUsername: boolean
  }>
export type StoreSettingsPasswordReset = BaseSettings &
  Readonly<{
    hasConfirmNew: boolean
    hasConfirmOld: boolean
    hasEmail: boolean
  }>
export type StoreSettingsSections =
  | StoreSettingsAddress
  | StoreSettingsCreditCard
  | StoreSettingsLogin
  | StoreSettingsPasswordReset

export type StoreSettings = Readonly<{
  address: StoreSettingsAddress
  creditCard: StoreSettingsCreditCard
  login: StoreSettingsLogin
  passwordReset: StoreSettingsPasswordReset
  [section: string]: Object
}>

const baseSettings: BaseSettings = {
  areAttrIdentifying: true,
  areIdsUnique: true,
  isAdjacentInput: false,
  isDeeperInput: false,
  isFieldset: false,
  isForm: false,
  isIframeSection: false,
  isInputNested: false,
  isInputNestedWithDeepInput: false,
  isInputNestedWithRandomText: false,
  isInputNestedWithShallowInput: false,
  isLabelled: false,
  isLabelledOnlyText: false,
  isLabelledWithFor: true,
  isLocaleChanged: false,
  isMultiButton: false,
  isVisible: true,
  isWrappedInDiv: false,
  iterations: 1,
  locale: 'ja-JP',
}

const initialState: StoreSettings = {
  address: {
    ...baseSettings,
    hasEmail: false,
    hasName: false,
    hasPhone: false,
    isIframeField: false,
  },
  creditCard: {
    ...baseSettings,
  },
  login: {
    ...baseSettings,
    is2FA: false,
    isPassword: true,
    isAccountId: false,
    isUsername: true,
  },
  passwordReset: {
    ...baseSettings,
    hasConfirmNew: true,
    hasConfirmOld: true,
    hasEmail: false,
    isVisible: false,
  },
}

export default function settingsReducer(
  state: StoreSettings = initialState,
  action: Action
): StoreSettings {
  switch (action.type) {
    case COMMIT:
      return action.payload
    case RESET:
      return initialState
    default:
      return state
  }
}
