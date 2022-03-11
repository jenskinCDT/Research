import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import HttpService from '../services/HttpService';
import rootReducer from './reducers/index';
import { createLogger } from 'redux-logger';

const middlewares = [thunk, createLogger()];
const setup = () => {
  const middleware = applyMiddleware(...middlewares, axiosMiddleware(HttpService.getAxiosClient()));
  return createStore(rootReducer, middleware);
};

const StoreService = {
  setup,
};

export default StoreService;
