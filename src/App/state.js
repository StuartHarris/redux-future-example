import { handleActions, createAction } from 'redux-actions';
import { createStructuredSelector } from 'reselect';
import { compose, pipe, map, prop, path } from 'ramda';
import Future, { fold } from 'fluture';
import { tagged } from 'daggy';

import futurizeP from '../lib/futurizeP';
import { NotAsked, Failure, Success } from '../lib/remote-data';
import { fetchJson } from './side-effects';

const futurize = futurizeP(Future);

export const GET_SCHEDULE = 'GET_SCHEDULE';

// makeUrl :: a -> a
const makeUrl = day => `http://www.bbc.co.uk/radio4/programmes/schedules/fm/${day}.json`;
// httpGet :: a -> Future RemoteData b
const httpGet = compose(fold(Failure, Success), futurize(fetchJson));
// fetchData :: a -> Future RemoteData b
const fetchData = compose(httpGet, makeUrl);
// Broadcast :: a -> a -> a -> b
const Broadcast = tagged('id', 'title', 'start');
// toBroadcast :: a -> b
const toBroadcast = a => Broadcast(prop('pid', a), path(['programme', 'display_titles', 'title'], a), prop('start', a));
// getBroadcasts :: a -> Array b
const getBroadcasts = path(['schedule', 'day', 'broadcasts']);
// transform :: RemoteData a -> RemoteData b
const transform = a => {
  if (!(a instanceof Success)) {
    return a;
  }
  return Success(map(toBroadcast)(getBroadcasts(a.data)));
};

export const getSchedule = createAction(GET_SCHEDULE, pipe(
  fetchData,      // Future Success data
  map(transform), // Future Success Array Broadcast
));

const handleGetSchedule = (state, action) => ({
  ...state,
  broadcasts: action.payload,
});

export default handleActions({
  [GET_SCHEDULE]: handleGetSchedule,
}, { broadcasts: NotAsked });

export const selector = createStructuredSelector({
  broadcasts: prop('broadcasts'),
});
