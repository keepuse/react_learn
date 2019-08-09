import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";

// configureStore() 执行完返回一个store
// 无参数，没有预加载的state
const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    );
  }
}
