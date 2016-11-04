import { taggedSum } from 'daggy';

const RemoteData = taggedSum({
  NotAsked: [],
  Loading: [],
  Failure: ['error'],
  Success: ['items'],
});
export const { NotAsked, Success } = RemoteData;
