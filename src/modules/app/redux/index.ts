import {combineReducers} from 'redux';

import {bootstrapReducer} from './bootstrap';

const appReducer = combineReducers({
  bootstrap: bootstrapReducer,
});

export type TStoreApp = ReturnType<typeof appReducer>;

export default appReducer;
