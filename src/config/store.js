import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducers from '../redux/ducks';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();
let store;

if (__DEV__) {
  store = createStore(reducers, applyMiddleware(sagaMiddleware, logger));
} else {
  store = createStore(reducers, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

export default store;
