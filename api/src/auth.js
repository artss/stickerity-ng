import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import db from './models';
import { passwordHash } from './util/auth';

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
        name: user.name,
        salt: user.salt,
      });

      return;
    }
  }

  setTimeout(() => {
    done({ message: 'Invalid credentials' });
  }, 5000);
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  issuer: 'stickerity.com',
  audience: process.env.DOMAIN || 'stickerity.com',
};

passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
  done(null, payload);
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

      const token = jwt.sign(user, process.env.SECRET);
      res.json({ user, token });
    });
  })(req, res);
};

export const checkAuth = passport.authenticate('jwt', { session: false });
