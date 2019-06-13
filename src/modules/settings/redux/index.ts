import {put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
import * as yup from 'yup'

import {Action} from '../../../store'
import {db} from '../../../lib/database'

const INIT = 'settings/set/INIT'
const COMMIT = 'settings/set/COMMIT'
const RESET = 'settings/RESET'

export type SectionTypes = 'address' | 'creditCard' | 'login' | 'passwordReset'
type InitActionPayload = {
  section: SectionTypes | 'all'
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

export type StoreSettingsAddress = Readonly<{
  areIdsUnique: boolean
  hasEmail: boolean
  hasName: boolean
  hasPhone: boolean
  isForm: boolean
  isIframeField: boolean
  isIframeSection: boolean
  isLabelled: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
}>
export type StoreSettingsCreditCard = Readonly<{
  areIdsUnique: boolean
  isForm: boolean
  isIframeSection: boolean
  isLabelled: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
}>
export type StoreSettingsLogin = Readonly<{
  areIdsUnique: boolean
  isForm: boolean
  isIframeSection: boolean
  isLabelled: boolean
  isMultiButton: boolean
  isThreeField: boolean
  isVisible: boolean
  iterations: number
}>
export type StoreSettingsPasswordReset = Readonly<{
  areIdsUnique: boolean
  hasConfirmNew: boolean
  hasConfirmOld: boolean
  hasEmail: boolean
  isForm: boolean
  isIframeSection: boolean
  isLabelled: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
}>
export type StoreSettings = Readonly<{
  address: StoreSettingsAddress
  creditCard: StoreSettingsCreditCard
  login: StoreSettingsLogin
  passwordReset: StoreSettingsPasswordReset
  [section: string]: Object
}>
const initialState: StoreSettings = {
  address: {
    areIdsUnique: true,
    hasEmail: false,
    hasName: false,
    hasPhone: false,
    isForm: false,
    isIframeField: false,
    isIframeSection: false,
    isLabelled: false,
    isMultiButton: false,
    isVisible: true,
    iterations: 1,
  },
  creditCard: {
    areIdsUnique: true,
    isForm: false,
    isIframeSection: false,
    isLabelled: false,
    isMultiButton: false,
    isVisible: true,
    iterations: 1,
  },
  login: {
    areIdsUnique: true,
    isForm: false,
    isIframeSection: false,
    isLabelled: false,
    isMultiButton: false,
    isThreeField: false,
    isVisible: true,
    iterations: 1,
  },
  passwordReset: {
    areIdsUnique: true,
    hasConfirmNew: true,
    hasConfirmOld: true,
    hasEmail: false,
    isForm: false,
    isIframeSection: false,
    isLabelled: false,
    isMultiButton: false,
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
    case RESET:
      return initialState
    default:
      return state
  }
}

export const settingsSchema = yup
  .object({
    address: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        hasName: yup.boolean().required(),
        hasPhone: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeField: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
    creditCard: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
    login: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isThreeField: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
    passwordReset: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        hasConfirmNew: yup.boolean().required(),
        hasConfirmOld: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
  })
  .strict(true)
  .noUnknown()
