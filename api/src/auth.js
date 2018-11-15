import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

import db from './models';
import { passwordHash, activationToken } from './util/auth';
import { verify } from './util/recaptcha';
import { sendMail } from './util/mail';
import { pick } from './util/objects';

import {
  JWT_COOKIE_NAME,
  TOKEN_EXPIRES,
  AUTH_FAIL_DELAY,
  JwtCookieOptions,
} from './constants';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await db.Users.findOne({
    where: { email },
    attributes: ['id', 'name', 'password', 'salt'],
  });

  if (user) {
    const hash = await passwordHash(password, user.salt);
    if (user.password === hash) {
      done(null, {
        id: user.id,
        email,
        name: user.name,
        salt: user.salt,
      });

      return;
    }
  }

  setTimeout(() => {
    done({ message: 'Invalid credentials' });
  }, AUTH_FAIL_DELAY + Math.random());
}));

const jwtOpts = {
  secretOrKey: process.env.SECRET,
  expiresIn: TOKEN_EXPIRES,
  ignoreExpiration: false,
  jwtFromRequest: ExtractJwt.fromExtractors([
    req => req && req.cookies && req.cookies[JWT_COOKIE_NAME],
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
};

passport.use(new JwtStrategy(jwtOpts, (user, done) => {
  const now = Date.now() / 1000;

  if (user.iat > now || user.exp < now) {
    return done({ message: 'Unauthorized' });
  }

  return done(null, pick(user, ['id', 'name', 'email', 'salt']));
}));

export const authenticate = async (req, res) => {
  const { success } = await verify(req.body.recaptchaToken);

  if (!success) {
    res.json(400, { message: 'Recaptcha failed' });
    return;
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.json(400, { ...err, ...info });
      return;
    }

    req.login(user, { session: false }, (authError) => {
      if (authError) {
        res.send(authError);
        return;
      }

      const token = jwt.sign(user, process.env.SECRET, { expiresIn: TOKEN_EXPIRES });

      res.setCookie(JWT_COOKIE_NAME, token, JwtCookieOptions);

      res.json(user);
    });
  })(req, res);
};

export const checkAuth = passport.authenticate('jwt', { session: false });

export const register = async (req, res) => {
  const {
    name,
    email,
    salt,
    password,
    recaptchaToken,
  } = req.body;

  const { success } = await verify(recaptchaToken);

  if (!success) {
    res.json(400, { message: 'Recaptcha failed' });
    return;
  }

  try {
    const { id } = await db.Users.create({
      name,
      email,
      salt,
      password: await passwordHash(password, salt),
    });

    const user = {
      id,
      email,
      name,
      salt,
    };

    const token = jwt.sign(user, process.env.SECRET, { expiresIn: TOKEN_EXPIRES });

    res.setCookie(JWT_COOKIE_NAME, token, JwtCookieOptions);

    res.json(user);

    const link = 'https://stickerity.com/activate?' + querystring.stringify({
      email,
      token: activationToken(email),
    });

    sendMail(email, name, 'activation.txt', {
      subject: 'Stickerity account activation',
      name: name || 'user',
      link,
    });
  } catch (e) {
    console.error(e.errors);
    const emailFailed = e.errors.some(err => err.path === 'email');
    res.json(400, {
      message: emailFailed
        ? 'User exists'
        : 'Something went wrong',
    });
  }
};

export const activate = async (req, res) => {
  const { email, token } = req.body;

  if (activationToken(email) !== token) {
    res.json(400, { message: 'Invalid token' });
    return;
  }

  const user = await db.Users.findOne({
    where: { email },
    attributes: ['id', 'name', 'salt', 'active'],
  });

  if (!user) {
    res.json(400, { message: 'User not found' });
    return;
  }

  if (user.active) {
    res.json(400, { message: 'Invalid link' });
    return;
  }

  res.json({
    id: user.id,
    email,
    name: user.name,
    salt: user.salt,
  });

  db.Users.update({ active: true }, { where: { id: user.id } });
};

export const logout = (req, res) => {
  res.clearCookie(JWT_COOKIE_NAME, JwtCookieOptions);
  res.json({ ok: true });
};
