import { handleActions, createAction } from 'redux-actions';
import { createStructuredSelector } from 'reselect';
import { map, prop, compose } from 'ramda';
import { Future } from 'ramda-fantasy';
import { tagged } from 'daggy';

import { getJson } from './side-effects';

export const GET_SCHEDULE = 'GET_SCHEDULE';

const httpGet = url => Future((reject, resolve) => getJson(url).then(resolve, reject));

const makeUrl = day => `http://www.bbc.co.uk/radio4/programmes/schedules/fm/${day}.json`;

export const getSchedule = createAction(GET_SCHEDULE, compose(httpGet, makeUrl));

const Broadcast = tagged('id', 'title', 'start');
const toBroadcast = x => Broadcast(x.pid, x.programme.display_titles.title, x.start);
const mapBroadcasts = map(toBroadcast);

export default handleActions({
  [GET_SCHEDULE]: (state, action) => {
    let broadcasts = [];
    let error = null;
    if (action.error) {
      error = action.payload;
    } else {
      broadcasts = mapBroadcasts(action.payload.schedule.day.broadcasts);
    }
    return {
      ...state,
      broadcasts,
      error,
    };
  },
}, { broadcasts: [], error: null });

const broadcasts = prop('broadcasts');
const error = prop('error');
export const selector = createStructuredSelector({ broadcasts, error });
