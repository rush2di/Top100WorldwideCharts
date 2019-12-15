import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./components/store/rootReducer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./components/assetes/skeleton.scss";
import "./components/nav/menu.scss";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
