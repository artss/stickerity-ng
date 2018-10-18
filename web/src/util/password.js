import range from './range';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SIGNS = '!@#$%^&*()-_=+[]{}\\|;:\'",.<>/?';

export function generate({
  length,
  lowercase,
  uppercase,
  numbers,
  signs,
}) {
  const chars = [
    lowercase ? LOWERCASE : '',
    uppercase ? UPPERCASE : '',
    numbers ? NUMBERS : '',
    signs ? SIGNS : '',
  ].join('');

  return range(length).map(() => chars[Math.round(Math.random() * chars.length)]).join('');
}
