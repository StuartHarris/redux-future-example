import test from 'ava';
import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import App from '.';
import { NotAsked } from '../lib/remote-data';

const middlewares = [];
const mockStore = configureStore(middlewares);

test('renders without crashing', t => {
  const initialState = { app: {
    error: null,
    broadcasts: NotAsked,
  } };
  const store = mockStore(initialState);
  t.notThrows(() => {
    mount(<App store={store} />);
  });
});
