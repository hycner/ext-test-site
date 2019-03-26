import {createSelector} from 'reselect';

import {TStore} from '../../rootReducer';

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
];

export type TTimelineData = {
  pendingText: string | null;
  items: Array<TTimelineItem>;
};
export type TTimelineItem = {
  errors: string[];
  hasErrors: boolean;
  key: string;
  label: string;
};

const INACTIVE_STATE = {
  pendingText: null,
  items: [],
};

export const getTimelineData = createSelector(
  [
    (state: TStore) => state.test.run.data.currentTest,
    (state: TStore) => state.test.run.data.hasRun,
    (state: TStore) => state.test.run.isLoading,
    (state: TStore) => state.test.iframes.data.testErrors,
    (state: TStore) => state.test.dom.data.testErrors,
    (state: TStore) => state.test.events.data.testErrors,
  ],
  (currentTestIdx, hasTestRan, isTestRunning, iframesErrors, domErrors, eventsErrors) => {
    const testErrors: {[key: string]: string[]} = {
      dom: domErrors,
      events: eventsErrors,
      iframes: iframesErrors,
    };

    if (!hasTestRan) return INACTIVE_STATE;

    let items: Array<TTimelineItem> = TESTS.map(x => ({
      ...x,
      errors: testErrors[x.key],
      hasErrors: !!testErrors[x.key].length,
    }));

    if (isTestRunning) {
      items = items.slice(0, currentTestIdx - 1);
    }

    return {
      pendingText: isTestRunning
        ? `Running test ${currentTestIdx}: ${TESTS[currentTestIdx - 1].label}`
        : null,
      items,
    };
  }
);
