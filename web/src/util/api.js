const API_URL = '/api';

export class APIError extends Error {}

export function get(url) {
  return fetch(`${API_URL}/${url}`);
}

export async function post(url, data) {
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new APIError(resData.message);
  }

  return resData;
}
