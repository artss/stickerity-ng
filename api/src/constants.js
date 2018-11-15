export const JWT_COOKIE_NAME = 'jwt';
export const TOKEN_EXPIRES = 60 * 60 * 24 * 365;
export const AUTH_FAIL_DELAY = 3000;

export const JwtCookieOptions = {
  domain: '.' + process.env.DOMAIN,
  path: '/',
  maxAge: TOKEN_EXPIRES,
  secure: true,
  httpOnly: true,
};
