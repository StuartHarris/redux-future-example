import { handleActions, createAction } from 'redux-actions';
import { createStructuredSelector } from 'reselect';
import { map, prop, path } from 'ramda';
import { Left, Right, compose, pipe, lift, gets } from 'sanctuary';
import Future, { fold } from 'fluture';
import { tagged } from 'daggy';

import futurizeP from '../util/futurizeP';
import { fetchJson } from './side-effects';

const futurize = futurizeP(Future);

export const GET_SCHEDULE = 'GET_SCHEDULE';

const makeUrl = day => `http://www.bbc.co.uk/radio4/programmes/schedules/fm/${day}.json`;
const httpGet = compose(fold(Left, Right), futurize(fetchJson));
const fetchData = compose(httpGet, makeUrl);
const Broadcast = tagged('id', 'title', 'start');
const toBroadcast = a => Broadcast(prop('pid', a), path(['programme', 'display_titles', 'title'], a), prop('start', a));
const getBroadcasts = gets(Array, ['schedule', 'day', 'broadcasts']);

export const getSchedule = createAction(GET_SCHEDULE, pipe([
  fetchData,                          // Future Either Error, data
  map(lift(getBroadcasts)),           // Future Either Error, (Maybe Array broadcast)
  map(lift(lift(map(toBroadcast)))),  // Future Either Error, (Maybe Array Broadcast)
  map(lift(a => a.value)),            // Future Either Error, (Array Broadcast)
]));

const handleGetSchedule = (state, action) => ({
  ...state,
  broadcasts: action.payload,
});

export default handleActions({
  [GET_SCHEDULE]: handleGetSchedule,
}, { broadcasts: Right([]) });

export const selector = createStructuredSelector({
  broadcasts: prop('broadcasts'),
});
