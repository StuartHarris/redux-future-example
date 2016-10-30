import { isFSA } from 'flux-standard-action';
import { Future } from 'ramda-fantasy';
import { getSchedule, GET_SCHEDULE } from './state';

describe('getSchedule', () => {
  it('should create a flux standard action of the correct type', () => {
    const action = getSchedule('today');
    expect(isFSA(action)).toBe(true);
    expect(action.type).toBe(GET_SCHEDULE);
  });
  it('should use a Future', () => {
    const action = getSchedule('today');
    expect(action.payload).toBeInstanceOf(Future);
  });
  it('should get todays schedule', () => {
    const data = { x: 1 };
    jest.setMock('./side-effects', { getJson: () => Promise.resolve(data) });
    jest.resetModules();
    const getSchedule = require('./state').getSchedule; // eslint-disable-line global-require
    const action = getSchedule('today');
    return new Promise((resolve, reject) => {
      action.payload.fork(
        e => {
          reject(e);
        },
        a => {
          expect(a).toEqual(data);
          resolve(a);
        }
      );
    });
  });
});
