import { getTime } from './time';

export function generateId() {
  const time = getTime();
  return btoa(time.toString(36)).replace(/[^a-z0-9-]+/ig, '');
}
