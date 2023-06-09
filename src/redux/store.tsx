import rootReducer from '@src/redux/root-reducer';

import {
  configureStore,
  Middleware as ReduxMiddleware,
} from '@reduxjs/toolkit';

import { rootSaga, rootSagaMiddleware } from './root.saga';

import { SagaMiddleware } from 'redux-saga';
import { loggerMiddleware } from './middlewares/logger.middlewear';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware: Array<SagaMiddleware | ReduxMiddleware> = [
  rootSagaMiddleware,
  loggerMiddleware,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

rootSagaMiddleware.run(rootSaga);

export type AppStoreType = typeof store;

export const persistor = persistStore(store);
