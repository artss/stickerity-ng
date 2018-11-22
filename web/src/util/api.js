export class APIError extends Error {
  constructor({ code, message }) {
    super(message);
    this.code = code;
  }
}

let delta = 0;

async function processResponse(response) {
  const res = await response;

  let data;
  try {
    const serverDate = res.headers.get('date');
    if (serverDate) {
      delta = new Date() - new Date(serverDate);
    }
    data = await res.json();
  } catch (e) {
    if (res.status >= 400) {
      data = { code: res.status, message: res.statusText };
    } else {
      throw e;
    }
  }

  if (!res.ok) {
    throw new APIError({
      code: data.code,
      message: data.message,
    });
  }

  return data;
}

export function get(url) {
  return processResponse(fetch(`${API_URL}/${url}`, {
    method: 'GET',
    credentials: 'include',
  }));
}

export function post(url, params) {
  return processResponse(fetch(`${API_URL}/${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
  }));
}

export function getTime() {
  return Date.now() - delta;
}
