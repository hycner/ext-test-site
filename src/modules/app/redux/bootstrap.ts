import {call, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'
import localforage from 'localforage'
import * as yup from 'yup'

import {Action} from '../../../store'
import {messageCallback} from '../../test/redux/events/tests'
import {setSettings} from '../../settings/redux'
import {StoreSettings} from '../../settings/redux'

const INIT = 'app/bootstrap'
const PENDING = 'app/bootstrap/PENDING'
const SUCCESS = 'app/bootstrap/SUCCESS'
const FAILURE = 'app/bootstrap/FAILURE'

type InitAction = {
  type: 'app/bootstrap'
}
type PendingAction = {
  type: 'app/bootstrap/PENDING'
}
type SuccessAction = {
  type: 'app/bootstrap/SUCCESS'
  payload: {
    singleComponentDisplay: boolean | string
    singleSectionDisplay: boolean | 'address' | 'creditCard' | 'login'
  }
}
type FailureAction = {
  type: 'app/bootstrap/FAILURE'
  payload: Error
}

export function bootstrap(): InitAction {
  return {type: INIT}
}
function bootstrapPending(): PendingAction {
  return {type: PENDING}
}
function bootstrapSuccess(payload: {
  singleComponentDisplay: boolean | string
  singleSectionDisplay: boolean | 'address' | 'creditCard' | 'login'
}): SuccessAction {
  return {
    type: SUCCESS,
    payload
  }
}
function bootstrapFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

const settingsSchema = yup
  .object({
    address: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        hasEmail: yup.boolean().required(),
        hasPhone: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isIframeField: yup.boolean().required(),
        isIframeSection: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
    creditCard: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
    login: yup
      .object({
        areIdsUnique: yup.boolean().required(),
        isForm: yup.boolean().required(),
        isMultiButton: yup.boolean().required(),
        isThreeField: yup.boolean().required(),
        isVisible: yup.boolean().required(),
        iterations: yup.number().required(),
      })
      .required(),
  })
  .strict(true)
  .noUnknown()

function* bootstrapTask(): SagaIterator {
  yield put(bootstrapPending())

  try {
    // for event testing
    window.addEventListener('message', messageCallback)

    // load settings
    const settings: StoreSettings = yield call(localforage.getItem, 'settings')

    try {
      if (!settings) throw new Error('No Settings found')

      settingsSchema.validateSync(settings)

      yield put(
        setSettings({
          section: 'all',
          settings,
        })
      )
    } catch (err) {
      console.log(
        'Persisted settings key mismatch (login). Wiping settings. Either no existing settings or because of a new settings schema version'
      )
      localforage.removeItem('settings')

      // todo: instead of doing this should the fields just not render fully until loading is done?
      // Default starter settings after 'loading' bootstrap starting state
      yield put(
        setSettings({
          section: 'all',
          settings: {
            address: {
              areIdsUnique: true,
              hasEmail: false,
              hasPhone: false,
              isForm: false,
              isIframeField: false,
              isIframeSection: false,
              isMultiButton: false,
              isVisible: true,
              iterations: 1,
            },
            creditCard: {
              areIdsUnique: true,
              isForm: false,
              isMultiButton: false,
              isVisible: true,
              iterations: 1,
            },
            login: {
              areIdsUnique: true,
              isForm: false,
              isMultiButton: false,
              isThreeField: false,
              isVisible: true,
              iterations: 1,
            },
          },
        })
      )
    }

    // see if this is a single component/section render of the page (in an iframe)
    let singleComponentDisplay: boolean | string = false;
    let singleSectionDisplay: boolean | string = false;
    let query = window.location.search.substring(1);
    let params = query.split('&');
    params.some(p => {
      if (p.includes('singleComponent')) {
        singleComponentDisplay = decodeURIComponent(p.split('=')[1]);
        return true
      }
      if (p.includes('singleSection')) {
        singleSectionDisplay = decodeURIComponent(p.split('=')[1])
        if (!['address', 'creditCard', 'login'].includes(singleSectionDisplay)) {
          singleSectionDisplay = false;
          console.log('Invalid singleSection query parameter')
        }
        return true
      }
      return false
    })

    yield put(bootstrapSuccess({singleComponentDisplay, singleSectionDisplay}))
  } catch (err) {
    yield put(bootstrapFailure(err))
  }
}

export function* bootstrapWatcher(): SagaIterator {
  yield takeEvery(INIT, bootstrapTask)
}

type StoreAppBootstrap = {
  isDone: boolean
  singleComponentDisplay: boolean | string
  singleSectionDisplay: boolean | 'address' | 'creditCard' | 'login'
}
const initialState: StoreAppBootstrap = {
  isDone: false,
  singleComponentDisplay: false,
  singleSectionDisplay: false,
}

export function bootstrapReducer(
  state: StoreAppBootstrap = initialState,
  action: Action
): StoreAppBootstrap {
  switch (action.type) {
    case SUCCESS:
      return {
        isDone: true,
        singleComponentDisplay: action.payload.singleComponentDisplay,
        singleSectionDisplay: action.payload.singleSectionDisplay,
      }
    case FAILURE:
      return {...state, isDone: true}
    default:
      return state
  }
}
