import { createAction } from 'redux-actions';
import { compose, pipe, map, path, is } from 'ramda';
import Future, { fold } from 'fluture';
import { tagged } from 'daggy';

import futurizeP from '../lib/futurizeP';
import { Failure, Success } from '../lib/remote-data';
import { fetchJson } from './side-effects';

const futurize = futurizeP(Future);

export const GET_SCHEDULE = 'GET_SCHEDULE';

// makeUrl :: a -> a
const makeUrl = day => `http://www.bbc.co.uk/radio4/programmes/schedules/fm/${day}.json`;
// httpGet :: a -> Future RemoteData b
const httpGet = compose(fold(Failure, Success), futurize(fetchJson));
// fetchData :: a -> Future RemoteData b
const fetchData = compose(httpGet, makeUrl);
// getBroadcasts :: a -> Array b
const getBroadcasts = path(['schedule', 'day', 'broadcasts']);
// Broadcast :: a -> a -> a -> b
const Broadcast = tagged('id', 'title', 'start');
// toBroadcast :: a -> b
const toBroadcast = a => Broadcast(a.pid, path(['programme', 'display_titles', 'title'], a), a.start);
// transform :: RemoteData a -> RemoteData b
const transform = a => {
  if (!is(Success, a)) {
    return a;
  }
  return Success(map(toBroadcast)(getBroadcasts(a.data)));
};

export const getSchedule = createAction(GET_SCHEDULE, pipe(
  fetchData,      // Future Success data
  map(transform), // Future Success Array Broadcast
));