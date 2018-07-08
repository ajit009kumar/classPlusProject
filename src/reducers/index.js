'use strict'
import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { userReducers } from './userReducers';

export default combineReducers({
   players: userReducers
});