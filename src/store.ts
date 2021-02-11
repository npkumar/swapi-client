import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { applyMiddleware, createStore } from "redux";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const action = (type: string, payload?: unknown) =>
  store.dispatch({ type, payload });

export default () => store;
