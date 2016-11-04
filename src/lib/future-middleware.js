// based on redux-future

import { isFSA } from 'flux-standard-action';

import { Loading } from './remote-data';

function isFuture(val) {
  return val && typeof val.fork === 'function';
}

export default function futureMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isFuture(action)
        ? action.fork(
            error => (error.type ? dispatch(error) : next(action))
          , dispatch
          )
        : next(action);
    }

    return isFuture(action.payload)
      ? dispatch({ ...action, payload: Loading }) &&
        action.payload.fork(
          error => dispatch({ ...action, payload: error, error: true })
        , result => dispatch({ ...action, payload: result })
        )
      : next(action);
  };
}
