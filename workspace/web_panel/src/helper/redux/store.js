import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {persistStore} from "redux-persist";
import {rootReducer} from "./rootReducer";
import {all} from "redux-saga/effects";
import {authSaga} from "./saga/saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);


export function* rootSaga() {
    yield all([authSaga()]);
}


sagaMiddleware.run(rootSaga);

export default store;
