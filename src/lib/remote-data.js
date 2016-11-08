import { taggedSum } from 'daggy';

// RemoteData error data
export const RemoteData = taggedSum({
  NotAsked: [],
  Loading: [],
  Failure: ['error'],
  Success: ['data'],
});
export const { NotAsked, Loading, Failure, Success } = RemoteData;
