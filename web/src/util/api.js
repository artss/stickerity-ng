import { setTime } from './time';

export class APIError extends Error {
  constructor({ code, message }) {
    super(message);
    this.code = code;
  }
}

const DEBOUNCE_TIME = 2000;

async function processResponse(response) {
  const res = await response;

  let data;
  try {
    const serverDate = res.headers.get('date');
    if (serverDate) {
      setTime(new Date(serverDate));
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

export function post(url, params, signal) {
  return processResponse(fetch(`${API_URL}/${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
    signal,
  }));
}

const abortControllers = {};

export function abortablePost(url, params) {
  if (abortControllers[url]) {
    const { controller, timeout } = abortControllers[url];

    controller.abort();
    clearTimeout(timeout);
  }

  return new Promise((resolve, reject) => {
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        resolve(post(url, params, controller.signal));
      } catch (e) {
        reject(e);
      }
    }, DEBOUNCE_TIME);

    abortControllers[url] = {
      controller,
      timeout,
    };
  });
}

export function del(url) {
  return processResponse(fetch(`${API_URL}/${url}`, {
    method: 'DELETE',
    credentials: 'include',
  }));
}
