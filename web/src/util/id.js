import { getTime } from './time';

export function generateId() {
  return getTime().toString(36);
}
