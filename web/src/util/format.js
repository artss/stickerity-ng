export function formatTime(hour, min) {
  return new Date(0, 0, 0, hour, min)
    .toLocaleTimeString(
      typeof navigator !== 'undefined'
        ? navigator.language
        : 'en-US',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }
    );
}

export function firstWords(text, wordsNum) {
  const words = text.match(/(\S+(?=\s|$))+/g);

  if (!words) {
    return '';
  }

  const chunk = words.slice(0, wordsNum).join(' ').replace(/\s+\.+$/, '');
  return words.length > wordsNum ? `${chunk}...` : chunk;
}

export function formatUrl(url) {
  return /^\w\/\//.test(url) ? url : `http://${url}`;
}
