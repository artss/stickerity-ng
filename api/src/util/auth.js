import crypto from 'crypto';

export function passwordHash(password) {
  return crypto.createHash('sha256').update(process.env.SECRET + password).digest('hex');
}
