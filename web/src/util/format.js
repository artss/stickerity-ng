export function formatTime(hour, min) {
  return new Date(0, 0, 0, hour, min)
    .toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
}
