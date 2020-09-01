import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import CombineReducers from './CombineReducers';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  CombineReducers,
  composeEnhancers(applyMiddleware(...middleware)),
);
