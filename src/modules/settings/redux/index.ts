import {Action} from '../../../store'

const INIT = 'settings/SET'

type SetActionPayload = {
  section: 'login' | 'creditCard'
  config: {
    [option: string]: boolean | number
  }
}
type SetAction = {
  type: typeof INIT
  payload: SetActionPayload
}

export function setConfig(payload: SetActionPayload): SetAction {
  return {
    type: INIT,
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
type StoreSettings = {
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
    case INIT:
      return {
        ...state,
        [action.payload.section]: {
          ...state[action.payload.section],
          ...action.payload.config,
        }
      }
    default:
      return state
  }
}
