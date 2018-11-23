import * as api from './api';
import {
  getKey,
  generateKey,
  exportKey,
  importKey,
  encryptObject,
  decryptObject,
} from './crypt';

const maxUpdatedValues = new WeakMap();

export function maxUpdatedAt(list) {
  if (!list) {
    return 0;
  }

  let value = maxUpdatedValues.get(list);

  if (typeof value === 'undefined') {
    value = list.reduce((u, { $updatedAt = 0 }) => Math.max(u, $updatedAt), 0);
    maxUpdatedValues.set(list, value);
  }

  return value;
}

export function merge(list1, list2, defaultValue) {
  if (!list1 && list2) {
    return defaultValue;
  }

  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  const [primary, secondary] = [list1, list2].sort((a, b) => maxUpdatedAt(a) - maxUpdatedAt(b));

  const merged = [];
  const itemMap = primary.reduce(
    (map, item) => {
      const copy = { ...item };
      merged.push(copy);
      return { ...map, [copy.$id]: copy };
    },
    {}
  );

  const secondaryRest = secondary.filter((item) => {
    const primaryItem = itemMap[item.$id];
    if (!primaryItem) {
      return true;
    }

    if (primaryItem.$updatedAt >= item.$updatedAt) {
      return false;
    }

    // Yes, I mutate copies here. That's exactly what I want. `merged` items should be mutated.
    Object.keys(item).forEach((k) => {
      primaryItem[k] = item[k];
    });

    return false;
  });

  return [
    ...merged,
    ...secondaryRest,
  ];
}

export async function save(list, localStorageKey, apiEndpoint) {
  let key = getKey(localStorageKey);

  if (!key) {
    key = await generateKey(localStorageKey);
  }

  const k = await exportKey(localStorageKey);
  const data = await encryptObject(list, key);

  const encData = JSON.stringify({ k, data });

  localStorage.setItem(localStorageKey, encData);
  return api.post(apiEndpoint, { data: encData });
}

export async function load(localStorageKey, apiEndpoint) {
  let localList;
  let serverList;
  let key;

  const localData = localStorage.getItem(localStorageKey);

  if (localData) {
    const { k, data } = JSON.parse(localData);
    key = await importKey(localStorageKey, k);

    localList = await decryptObject(data, key);
  }

  let serverData;

  try {
    serverData = await api.get(apiEndpoint);
  } catch (e) {
    console.error('serverList', e);
  }

  if (serverData) {
    const { k, data } = serverData;

    if (data) {
      if (!key) {
        key = await importKey(localStorageKey, k);
      }

      serverList = await decryptObject(data, key);
    }
  }

  const merged = merge(localList, serverList, []);

  if (maxUpdatedAt(localList) !== maxUpdatedAt(serverList)) {
    save(merged, localStorageKey, apiEndpoint);
  }

  return merged;
}

export function unload(localStorageKey) {
  localStorage.removeItem(localStorageKey);
}
