import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import {persistStore} from "redux-persist";
import {rootReducer} from "./rootReducer";
import {all} from "redux-saga/effects";
import {saga} from "./saga/saga";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

export function* rootSaga() {
    yield all([saga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
