import crypto from 'crypto';

const PBKDF2_ITERATIONS = 2 ** 16;

export function passwordHash(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, 64, 'sha512', (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key.toString('hex'));
    });
  });
}

export function activationToken(email) {
  return crypto.createHash('sha512').update(process.env.SECRET + email).digest('hex');
}
