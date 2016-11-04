import { taggedSum } from 'daggy';

export const RemoteData = taggedSum({
  NotAsked: [],
  Loading: [],
  Failure: ['error'],
  Success: ['data'],
});
export const { NotAsked, Loading, Failure, Success } = RemoteData;
