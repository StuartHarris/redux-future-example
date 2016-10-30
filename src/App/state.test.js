import { getSchedule } from './state';

describe('getSchedule', () => {
  it('should get todays schedule', () => {
    expect(getSchedule('today')).toEqual('');
  });
});
