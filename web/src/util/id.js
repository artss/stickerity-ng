export function generateId() {
  return btoa(Date.now()).replace(/[^a-z0-9-]+/ig, '');
}
