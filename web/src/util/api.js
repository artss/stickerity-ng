const API_URL = '/api';

export function get(url) {
  return fetch(`${API_URL}${url}`);
}

export function post(url, data) {
  return fetch(`${API_URL}${url}`, { body: JSON.stringify(data), method: 'POST' });
}
