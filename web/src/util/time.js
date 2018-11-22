let delta = 0;

export function setTime(date) {
  delta = new Date() - date;
}

export function getTime() {
  return Date.now() - delta;
}
