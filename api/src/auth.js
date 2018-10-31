import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'mai veri stronk kei yes yes yes',
  issuer: 'stickerity.com',
  audience: process.env.DOMAIN || 'stickerity.com',
};

passport.use(new Strategy(opts, (payload, done) => {
  console.log('------ payload', payload);
  done(null, { id: 1, login: 'arts' });
}));

export default passport.authenticate('jwt', { session: false });
