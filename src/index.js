import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import futureMiddleware from './lib/future-middleware';
import App from './App';
import reducers from './rootReducer';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    futureMiddleware,
  ))
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
