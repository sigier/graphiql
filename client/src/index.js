import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import   "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/style.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import Reducers from "./store/reducers/index"
 

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(Reducers,
      window.__REDUX_DEVTOOLS_EXTENSIONS__&& window.__REDUX_DEVTOOLS_EXTENSIONS__()
      )}>
      <Routes />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
