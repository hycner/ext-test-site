import {Action} from '../../../store'

const INIT = 'customization/SET'

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

export type StoreCustomizationCreditCard = {
  areIdsUnique: boolean
  isForm: boolean
  isVisible: boolean
  iterations: number
}
export type StoreCustomizationLogin = {
  areIdsUnique: boolean
  isForm: boolean
  isVisible: boolean
  iterations: number
}
type StoreCustomization = {
  creditCard: StoreCustomizationCreditCard
  login: StoreCustomizationLogin
  [section: string]: Object
}
const initialState: StoreCustomization = {
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

export default function customizationReducer(
  state: StoreCustomization = initialState,
  action: Action
): StoreCustomization {
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
