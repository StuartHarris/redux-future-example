import { handleActions, createAction } from 'redux-actions';
import { createStructuredSelector } from 'reselect';
import { map, prop } from 'ramda';

export const GET_SCHEDULE = 'GET_SCHEDULE';

export const getSchedule = createAction(GET_SCHEDULE, async uri => {
  const response = await fetch(uri);
  return response.json();
});

export default handleActions({
  [GET_SCHEDULE]: (state, action) => {
    let broadcasts = [];
    if (!action.error) {
      broadcasts = map(b => ({
        id: b.pid,
        title: b.programme.display_titles.title,
        start: b.start,
      }), action.payload.schedule.day.broadcasts);
    }
    return {
      ...state,
      broadcasts,
    };
  },
}, { broadcasts: [] });

const broadcasts = prop('broadcasts');
export const selector = createStructuredSelector({ broadcasts });
