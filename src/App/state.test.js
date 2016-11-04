import { isFSA } from 'flux-standard-action';
import Future from 'fluture';
import { Success } from '../util/RemoteData';

import { getSchedule, GET_SCHEDULE } from './state';

describe('getSchedule', () => {
  it('should create a flux standard action of the correct type', () => {
    const action = getSchedule('today');
    expect(isFSA(action)).toBe(true);
    expect(action.type).toBe(GET_SCHEDULE);
  });
  it('should use a Future', () => {
    const action = getSchedule('today');
    expect(Future.isFuture(action.payload)).toBe(true);
  });
  it('should get todays schedule', () => {
    const data = { schedule: { day: { broadcasts: [{ pid: '1', start: 'now', programme: { display_titles: { title: 'hey' } } }] } } };
    jest.setMock('./side-effects', { fetchJson: () => Promise.resolve(data) });
    jest.resetModules();
    const getSchedule = require('./state').getSchedule; // eslint-disable-line global-require
    const action = getSchedule('today');
    return new Promise((resolve, reject) => {
      action.payload.fork(
        reject,
        a => {
          expect(a).toEqual(Success([{ id: '1', start: 'now', title: 'hey' }]));
          resolve(a);
        }
      );
    });
  });
  it('should handle errors', () => {
    jest.setMock('./side-effects', { fetchJson: () => Promise.reject(new Error('boom!')) });
    jest.resetModules();
    const getSchedule = require('./state').getSchedule; // eslint-disable-line global-require
    const action = getSchedule('today');
    return new Promise((resolve, reject) => {
      action.payload.fork(
        e => {
          expect(e).toEqual(new Error('boom!'));
          resolve();
        },
        reject
      );
    });
  });
});
