import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  // --使用redux中间件，创建一个store

  // store中应用了来自redux-thunk 的中间件thunkMiddleware 和
  // 使用redux-logger 的 createLogger函数创建的loggerMiddleware 中间件
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
