import createHistory from 'history/createBrowserHistory';

const history = typeof window === 'undefined'
  ? {
    push: () => {},
    listen: () => {},
    goBack: () => {},
  }
  : createHistory();

export default function getHistory() {
  return history;
}

export function navigate(url, state) {
  history.push(url, state);
}
