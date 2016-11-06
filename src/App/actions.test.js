import test from 'ava';
import { isFSA } from 'flux-standard-action';
import Future from 'fluture';
import { tagged } from 'daggy';

import { Failure, Success } from '../lib/remote-data';
import { getSchedule, GET_SCHEDULE } from './actions';

test('should create a flux standard action of the correct type', t => {
  const action = getSchedule()('today');
  t.true(isFSA(action));
  t.is(action.type, GET_SCHEDULE);
});

test('should use a Future', t => {
  const action = getSchedule()('today');
  t.true(Future.isFuture(action.payload));
});

test('should get todays schedule', t => {
  const data = { schedule: { day: { broadcasts: [{ pid: '1', start: 'now', programme: { display_titles: { title: 'hey' } } }] } } };
  const fetchJson = async () => data;
  const action = getSchedule(fetchJson)('today');
  return new Promise((resolve, reject) => {
    action.payload.fork(
      reject,
      actual => {
        const Broadcast = tagged('id', 'title', 'start');
        const expected = Success([Broadcast('1', 'hey', 'now')]);
        t.deepEqual(actual, expected);
        resolve();
      }
    );
  });
});

test('should handle errors', t => {
  const fetchJson = () => Promise.reject(new Error('boom!'));
  const action = getSchedule(fetchJson)('today');
  return new Promise((resolve, reject) => {
    action.payload.fork(
      reject,
      actual => {
        const expected = Failure(new Error('boom!'));
        t.deepEqual(actual, expected);
        resolve();
      },
    );
  });
});
