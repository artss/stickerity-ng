import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import querystring from 'querystring';

import db from './models';
import { passwordHash, activationToken } from './util/auth';
import { verify } from './util/recaptcha';
import { sendMail } from './util/mail';
import pick from './util/pick';

const JWT_COOKIE_NAME = 'jwt';
const TOKEN_EXPIRES = 60 * 60 * 24 * 365;
const AUTH_FAIL_TIMEOUT = 5000;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await db.Users.findOne({
    where: { email },
    attributes: ['id', 'name', 'password', 'salt'],
  });

  if (user) {
    const hash = passwordHash(password);
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
  }, AUTH_FAIL_TIMEOUT);
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

export const authenticate = (req, res) => {
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

      res.setCookie(JWT_COOKIE_NAME, token, {
        path: '/',
        maxAge: TOKEN_EXPIRES,
        secure: true,
        httpOnly: true,
      });
      res.json(user);
    });
  })(req, res);
};

export const checkAuth = passport.authenticate('jwt', { session: false });

export const register = async (req, res) => {
  const {
    name,
    email,
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
      password: passwordHash(password),
    });

    res.json({ id });

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
