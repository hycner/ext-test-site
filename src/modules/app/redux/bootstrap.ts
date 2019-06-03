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
function bootstrapSuccess(): SuccessAction {
  return {type: SUCCESS}
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

    yield put(bootstrapSuccess())
  } catch (err) {
    yield put(bootstrapFailure(err))
  }
}

export function* bootstrapWatcher(): SagaIterator {
  yield takeEvery(INIT, bootstrapTask)
}

type StoreAppBootstrap = {
  isDone: boolean
}
const initialState: StoreAppBootstrap = {
  isDone: false,
}

export function bootstrapReducer(
  state: StoreAppBootstrap = initialState,
  action: Action
): StoreAppBootstrap {
  switch (action.type) {
    case SUCCESS:
    case FAILURE:
      return {isDone: true}
    default:
      return state
  }
}
