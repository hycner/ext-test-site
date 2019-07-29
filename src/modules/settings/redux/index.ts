import {put, select, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
import * as yup from 'yup'

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
  areIdsUnique: boolean
  areAttrIdentifying: boolean
  isFieldset: boolean
  isForm: boolean
  isIframeSection: boolean
  isLabelled: boolean
  isLabelledWithFor: boolean
  isLocaleChanged: boolean
  isMultiButton: boolean
  isVisible: boolean
  iterations: number
  locale: LocaleOptions
}>

export type StoreSettingsAddress = BaseSettings & Readonly<{
  hasEmail: boolean
  hasName: boolean
  hasPhone: boolean
  isIframeField: boolean
}>
export type StoreSettingsCreditCard = BaseSettings & Readonly<{}>
export type StoreSettingsLogin = BaseSettings & Readonly<{
  isThreeField: boolean
}>
export type StoreSettingsPasswordReset = BaseSettings & Readonly<{
  hasConfirmNew: boolean
  hasConfirmOld: boolean
  hasEmail: boolean
}>
export type StoreSettings = Readonly<{
  address: StoreSettingsAddress
  creditCard: StoreSettingsCreditCard
  login: StoreSettingsLogin
  passwordReset: StoreSettingsPasswordReset
  [section: string]: Object
}>

const baseSettings: BaseSettings = {
  areIdsUnique: true,
  areAttrIdentifying: true,
  isFieldset: false,
  isForm: false,
  isIframeSection: false,
  isLabelled: false,
  isLabelledWithFor: true,
  isLocaleChanged: false,
  isMultiButton: false,
  isVisible: true,
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
    ...baseSettings
  },
  login: {
    ...baseSettings,
    isThreeField: false,
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

// YUP SCHEMA

const VALID_LOCALES: LocaleOptions[] = ['af', 'en-US', 'ja-JP']

export const settingsSchema = yup
  .object({
    address: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        hasName: yup.boolean().required(),
        hasPhone: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeField: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    creditCard: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    login: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isThreeField: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
    passwordReset: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        areAttrIdentifying: yup.boolean().required(),
        hasConfirmNew: yup.boolean().required(),
        hasConfirmOld: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        isFieldset: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isLabelled: yup.boolean().required(),
        isLabelledWithFor: yup.boolean().required(),
        isLocaleChanged: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
        locale: yup
          .string()
          .oneOf(VALID_LOCALES)
          .required(),
      })
      .required()
      .strict(true)
      .noUnknown(),
  })
  .strict(true)
  .noUnknown()
