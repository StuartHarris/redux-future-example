import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Nothing } from 'data.maybe';

import App from '.';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const initialState = { app: {
    error: null,
    broadcasts: Nothing(),
  } };
  const store = mockStore(initialState);
  ReactDOM.render((
    <App store={store} />
  ), div);
});
