import { createStore, applyMiddleware } from 'redux';

//allow the browser to cache our store
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
 
import rootSaga from './root-saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

// mount it on the store
export const store = createStore(
    rootReducer, 
    applyMiddleware(...middlewares)
);

// run the saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
//export default store;
