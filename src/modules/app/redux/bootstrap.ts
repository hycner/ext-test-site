import {call, put, takeEvery} from 'redux-saga/effects'
import {SagaIterator} from 'redux-saga'

import {Action, dispatch} from '../../../store'
import {db} from '../../../lib/database'
import {messageCallback} from '../../test/redux/events/tests'
import {
  resetSettings,
  SectionTypes,
  setSettings,
  setSettingsCommit,
  StoreSettings,
} from '../../settings/redux'
import settingsSchema from '../../settings/schemas/settingsSchema'

export type SingleSectionDisplay = '' | SectionTypes

// ACTIONS

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
    singleDisplayIteration: number
    singleSectionDisplay: SingleSectionDisplay
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
  singleDisplayIteration: number
  singleSectionDisplay: SingleSectionDisplay
}): SuccessAction {
  return {
    type: SUCCESS,
    payload,
  }
}
function bootstrapFailure(error: Error): FailureAction {
  return {
    type: FAILURE,
    payload: error,
  }
}

// SAGAS

function* bootstrapTask(): SagaIterator {
  yield put(bootstrapPending())

  try {
    // todo: figure this out
    // for event testing
    // window.addEventListener('message', messageCallback)

    // load settings
    const settings: StoreSettings = yield call(db.getItem, 'settings')

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
      db.removeItem('settings')
    }

    // see if this is a single component/section render of the page (in an iframe)
    let singleComponentDisplay: boolean | string = false
    let singleDisplayIteration: number = 0
    let singleSectionDisplay: SingleSectionDisplay = ''
    let query = window.location.search.substring(1)
    let params = query.split('&')

    for (let p of params) {
      if (p.includes('singleComponent')) {
        singleComponentDisplay = decodeURIComponent(p.split('=')[1])
      }
      if (p.includes('singleSection')) {
        const singleSection: string = decodeURIComponent(p.split('=')[1])
        switch (singleSection) {
          case 'address':
          case 'creditCard':
          case 'login':
          case 'passwordReset':
            singleSectionDisplay = singleSection
        }
      }
      if (p.includes('iteration')) {
        singleDisplayIteration = Number(decodeURIComponent(p.split('=')[1]))
      }
    }

    // if a single component/section render, then listen for localstorage changes to reload settings
    if (singleSectionDisplay || singleComponentDisplay) {
      window.addEventListener('storage', function(changes) {
        if (
          window.location.href.includes(changes.url) &&
          window.location.href !== changes.url &&
          changes.isTrusted &&
          changes.key === 'localforage/settings'
        ) {
          if (changes.newValue) {
            dispatch(setSettingsCommit(JSON.parse(changes.newValue)))
          } else {
            dispatch(resetSettings())
          }
        }
      })
    }

    yield put(
      bootstrapSuccess({
        singleComponentDisplay,
        singleDisplayIteration,
        singleSectionDisplay,
      })
    )
  } catch (err) {
    yield put(bootstrapFailure(err))
  }
}

export function* bootstrapWatcher(): SagaIterator {
  yield takeEvery(INIT, bootstrapTask)
}

// REDUCERS

type StoreAppBootstrap = Readonly<{
  isDone: boolean
  singleComponentDisplay: boolean | string
  singleDisplayIteration: number
  singleSectionDisplay: SingleSectionDisplay
}>
const initialState: StoreAppBootstrap = {
  isDone: false,
  singleComponentDisplay: false,
  singleDisplayIteration: 0,
  singleSectionDisplay: '',
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
        singleDisplayIteration: action.payload.singleDisplayIteration,
        singleSectionDisplay: action.payload.singleSectionDisplay,
      }
    case FAILURE:
      return {...state, isDone: true}
    default:
      return state
  }
}
