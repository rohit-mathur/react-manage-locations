import {createStore, applyMiddleware} from 'redux';
import locationReducer from './../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(locationReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

export default store;