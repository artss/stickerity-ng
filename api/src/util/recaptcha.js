import fetch from 'node-fetch';
import querystring from 'querystring';

export async function verify(token) {
  const url = 'https://www.google.com/recaptcha/api/siteverify?' + querystring.stringify({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
