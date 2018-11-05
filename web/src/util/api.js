const API_URL = '/api';

export function get(url) {
  return fetch(`${API_URL}/${url}`);
}

export function post(url, data) {
  return fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}
