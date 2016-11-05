// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { partial, map } from 'ramda';
import { format } from 'date-fns';

import { getSchedule } from './actions';
import { selector } from './reducers';

import logo from './logo.svg';
import './App.css';

const Table = ({ broadcasts }: {broadcasts: []}) => (
  <table>
    <thead><tr><th>Start</th><th>Title</th></tr></thead>
    <tbody>
      { map(b => (
        <tr key={b.id}><td>{format(b.start, 'hh:mm a')}</td><td>{b.title}</td></tr>
      ), broadcasts) }
    </tbody>
  </table>
);

const App = ({ getSchedule, broadcasts }: { getSchedule: () => Object, broadcasts: Object, }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Radio 4 Programmes</h2>
    </div>
    <button className="App-intro" onClick={() => getSchedule('today')}>Today</button>
    <button className="App-intro" onClick={() => getSchedule('tomorrow')}>Tomorrow</button>
    {
      broadcasts.cata({
        NotAsked: () => <div>Please click Today or Tomorrow</div>,
        Loading: () => <div>Loading...</div>,
        Failure: e => <div>{e.message}</div>,
        Success: a => <Table broadcasts={a} />,
      })
    }
  </div>
);

const state = state => selector(state.app);
const actions = partial(bindActionCreators, [{ getSchedule }]);

export default connect(state, actions)(App);
