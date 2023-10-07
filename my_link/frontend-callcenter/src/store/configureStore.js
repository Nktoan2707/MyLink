import createReducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";
import rootSaga from "./saga";

const configureStore = (initialState = {}) => {
  const rootReducer = createReducer();
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger({ collapsed: true });
  const middleware = [sagaMiddleware, loggerMiddleware];

  const store = createStore(enableBatching(rootReducer), initialState, applyMiddleware(...middleware));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
