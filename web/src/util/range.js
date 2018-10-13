/* eslint-disable no-param-reassign */

export default function range(start, end, step = 1) {
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  return Array.from(new Array(Math.floor((end - start) / step)), (n, i) => start + step * i);
}
