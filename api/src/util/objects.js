export function pick(obj, keys) {
  return keys.reduce(
    (out, key) => (
      Object.prototype.hasOwnProperty.call(obj, key)
        ? { ...out, [key]: obj[key] }
        : out
    ),
    {}
  );
}

export function omit(obj, keys) {
  return keys.reduce(
    (out, key) => (
      Object.prototype.hasOwnProperty.call(obj, key)
        ? out
        : { ...out, [key]: obj[key] }
    ),
    {}
  );
}
