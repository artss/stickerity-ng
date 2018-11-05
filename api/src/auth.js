import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

const SECRET = 'mai veri stronk kei yes yes yes';

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username, password, done) => {
  console.log('------ LocalStrategy', username, password);
  done(null, { id: 1, username });
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  issuer: 'stickerity.com',
  audience: process.env.DOMAIN || 'stickerity.com',
};

passport.use(new JwtStrategy(jwtOpts, (payload, done) => {
  console.log('------ JwtStrategy', payload);
  done(null, payload);
}));

export const authenticate = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('++++++ authenticate', user, info);
    if (err || !user) {
      res.json(400, {
        ...info,
        user,
      });

      return;
    }

    req.login(user, { session: false }, (authError) => {
      if (authError) {
        res.send(authError);
        return;
      }

      const token = jwt.sign(user, SECRET);
      res.json({ user, token });
    });
  })(req, res);
};

export const checkAuth = passport.authenticate('jwt', { session: false });
