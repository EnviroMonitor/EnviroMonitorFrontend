import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import mapData from './reducers';

import { createStore, applyMiddleware } from 'redux';

const initialState = Immutable.Map();
const rootReducer = combineReducers({ mapData });
const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

export default store;
