import { handleActions } from 'redux-actions';
import { createStructuredSelector } from 'reselect';
import { prop } from 'ramda';

import { GET_SCHEDULE } from './actions';
import { NotAsked } from '../lib/remote-data';

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
