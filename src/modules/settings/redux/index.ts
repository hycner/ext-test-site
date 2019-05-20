import {Action} from '../../../store'

const SET = 'settings/SET'

type SetActionPayload = {
  section: 'login' | 'creditCard' | 'all'
  settings: StoreSettings | {
    [option: string]: boolean | number
  }
}
type SetAction = {
  type: typeof SET
  payload: SetActionPayload
}

export function setSettings(payload: SetActionPayload): SetAction {
  return {
    type: SET,
    payload,
  }
}

export type StoreSettingsCreditCard = {
  areIdsUnique: boolean
  isForm: boolean
  isVisible: boolean
  iterations: number
}
export type StoreSettingsLogin = {
  areIdsUnique: boolean
  isForm: boolean
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
    isVisible: false,
    iterations: 1,
  },
  login: {
    areIdsUnique: true,
    isForm: false,
    isVisible: false,
    iterations: 1,
  },
}

export default function settingsReducer(
  state: StoreSettings = initialState,
  action: Action
): StoreSettings {
  switch (action.type) {
    case SET:
      if (action.payload.section === 'all') {
        return action.payload.settings
      } else {
        return {
          ...state,
          [action.payload.section]: {
            ...state[action.payload.section],
            ...action.payload.settings,
          }
        }
      }
    default:
      return state
  }
}
