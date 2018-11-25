import passport from 'passport';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';

import db from '../models';
import { passwordHash } from '../util/auth';
import { checkAuth } from './auth';

import {
  JWT_COOKIE_NAME,
  TOKEN_EXPIRES,
  JwtCookieOptions,
} from '../constants';

export function userInfo(req, res) {
  res.json(req.user);
}

export function saveProfile(req, res) {
  const {
    name,
    newEmail,
    password,
    newEmailPassword,
  } = req.body;

  if (!isEmail(newEmail || '') || !password) {
    res.json(400, { message: 'Invalid credentials' });
    return;
  }

  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      res.json(400, { ...err, ...info });
      return;
    }

    try {
      await db.Users.update(
        {
          name,
          email: newEmail,
          password: await passwordHash(
            newEmail === req.user.email ? password : newEmailPassword,
            req.user.salt
          ),
        },
        { where: { id: req.user.id } },
      );
    } catch (e) {
      res.json(400, {
        message: e.name === 'SequelizeUniqueConstraintError'
          ? 'E-mail is already taken'
          : e.message,
      });
      return;
    }

    const updatedUser = { ...user, name, email: newEmail };

    const token = jwt.sign(updatedUser, process.env.SECRET, { expiresIn: TOKEN_EXPIRES });

    res.setCookie(JWT_COOKIE_NAME, token, JwtCookieOptions);
    res.json(updatedUser);
  })(req, res);
}

export default (server) => {
  server.get('/api/user/profile', checkAuth, userInfo);
  server.post('/api/user/profile', checkAuth, saveProfile);
};
