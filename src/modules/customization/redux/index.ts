import {TAction} from '../../../store'

const INIT = 'customization/SET'

type InitActionPayload = {
  section: 'login' | 'creditCard'
  config: {
    [option: string]: boolean | number
  }
}
type TInitAction = {
  type: typeof INIT
  payload: InitActionPayload
}

export function setConfig(payload: InitActionPayload): TInitAction {
  return {
    type: INIT,
    payload,
  }
}

export type TStoreCustomizationCreditCard = {
  areIdsUnique: boolean
  isForm: boolean
  isVisible: boolean
  iterations: number
}
export type TStoreCustomizationLogin = {
  areIdsUnique: boolean
  isForm: boolean
  isVisible: boolean
  iterations: number
}
type TStoreCustomization = {
  creditCard: TStoreCustomizationCreditCard
  login: TStoreCustomizationLogin
  [section: string]: Object
}
const initialState: TStoreCustomization = {
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
  state: TStoreCustomization = initialState,
  action: TAction
): TStoreCustomization {
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
