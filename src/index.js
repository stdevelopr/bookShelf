import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import configureStore from "./store/configureStore";
import Favicon from "react-favicon";
import favicon from "./favicon.png";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Favicon url={favicon} />
    <Router>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
