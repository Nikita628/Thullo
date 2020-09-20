import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.slim.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import { requestInterceptor, responseErrorInterceptor } from "./services/httpInterceptors";
import rootReducer from "./state";
import runSagas from "./sagas";

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(null, responseErrorInterceptor);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware)
));

runSagas(sagaMiddleware);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
