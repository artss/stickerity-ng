const keys = {};

const VECTOR_SIZE = 16;

export function encode(str, encoding = 'utf-8') {
  const te = new TextEncoder(encoding);
  return te.encode(str);
}

export function decode(buffer, encoding = 'utf-8') {
  const td = new TextDecoder(encoding);
  return td.decode(buffer);
}

export function arrayToBase64(bytes) {
  return btoa(Array.prototype.map.call(bytes, c => String.fromCharCode(c)).join(''));
}

export function base64ToArray(str) {
  return new Uint8Array(Array.prototype.map.call(atob(str), c => c.charCodeAt(0)));
}

export async function decrypt(encData, key) {
  const dataArray = base64ToArray(encData);
  const iv = dataArray.slice(0, VECTOR_SIZE);
  const data = dataArray.slice(VECTOR_SIZE);
  const result = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, data);
  const decData = new Uint8Array(result);
  return decode(decData);
}

export async function encrypt(data, key) {
  const iv = crypto.getRandomValues(new Uint8Array(VECTOR_SIZE));
  const result = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, encode(data));
  const resultArray = new Uint8Array(result);
  const encData = new Uint8Array(iv.length + resultArray.length);
  encData.set(iv);
  encData.set(resultArray, iv.length);
  return arrayToBase64(encData);
}

export async function decryptObject(data, key) {
  const str = await decrypt(data, key);
  return JSON.parse(str);
}

export function encryptObject(obj, key) {
  return encrypt(JSON.stringify(obj), key);
}

export async function setPasswordKey(salt, password) {
  const hash = await crypto.subtle.digest({ name: 'SHA-256' }, encode(salt + password));
  const key = await crypto.subtle.importKey('raw', hash, { name: 'AES-CBC' }, true, ['encrypt', 'decrypt']);
  keys.password = key;
  return key;
}

export function getPasswordKey() {
  return keys.password;
}

export async function setKey(id, rawKey) {
  const key = await crypto.subtle.importKey('raw', rawKey, { name: 'AES-CBC' }, true, ['encrypt', 'decrypt']);
  keys[id] = key;
  return key;
}

export function getKey(id) {
  return keys[id];
}

export async function generateKey(id) {
  const key = await crypto.subtle.generateKey({ name: 'AES-CBC', length: 256 }, true, ['encrypt', 'decrypt']);
  keys[id] = key;
  return key;
}

export async function exportKey(id) {
  const key = getKey(id);
  const passwordKey = getPasswordKey();
  const keyObject = await crypto.subtle.exportKey('jwk', key);
  return encryptObject(keyObject, passwordKey);
}

export async function importKey(id, rawKey) {
  const passwordKey = getPasswordKey();
  const keyObject = await decryptObject(rawKey, passwordKey);
  const key = await crypto.subtle.importKey('jwk', keyObject, { name: 'AES-CBC' }, true, ['encrypt', 'decrypt']);
  keys[id] = key;
  return key;
}
