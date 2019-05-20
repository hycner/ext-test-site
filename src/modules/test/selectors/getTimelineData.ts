import {createSelector} from 'reselect'

import {Store} from '../../rootReducer'

const TESTS = [
  {
    key: 'iframes',
    label: 'IFrame Access',
  },
  {
    key: 'dom',
    label: 'DOM Leaks',
  },
  {
    key: 'events',
    label: 'Event Hijacking',
  },
]

export type TimelineData = {
  pendingText: string | null
  items: Array<TimelineItem>
}
export type TimelineItem = {
  errors: string[]
  hasErrors: boolean
  key: string
  label: string
}

const INACTIVE_STATE = {
  pendingText: null,
  items: [],
}

export const getTimelineData = createSelector(
  [
    (state: Store) => state.test.run.data.currentTest,
    (state: Store) => state.test.run.data.hasRun,
    (state: Store) => state.test.run.isLoading,
    (state: Store) => state.test.iframes.data.testErrors,
    (state: Store) => state.test.dom.data.testErrors,
    (state: Store) => state.test.events.data.testErrors,
  ],
  (currentTestIdx, hasTestRan, isTestRunning, iframesErrors, domErrors, eventsErrors) => {
    const testErrors: {[key: string]: string[]} = {
      dom: domErrors,
      events: eventsErrors,
      iframes: iframesErrors,
    }

    if (!hasTestRan) return INACTIVE_STATE

    let items: Array<TimelineItem> = TESTS.map(x => ({
      ...x,
      errors: testErrors[x.key],
      hasErrors: !!testErrors[x.key].length,
    }))

    if (isTestRunning) {
      items = items.slice(0, currentTestIdx - 1)
    }

    return {
      pendingText: isTestRunning
        ? `Running test ${currentTestIdx}: ${TESTS[currentTestIdx - 1].label}`
        : null,
      items,
    }
  }
)
