import restify from 'restify';
import CookieParser from 'restify-cookies';
import { InternalServerError } from 'restify-errors';
import passport from 'passport';

import {
  authenticate,
  register,
  activate,
  checkAuth,
  logout,
} from './auth';
import { userInfo } from './user';

const server = restify.createServer({
  handleUncaughtExceptions: true,
});

server.use(CookieParser.parse);
server.use(restify.plugins.bodyParser({ mapParams: false }));
server.use(passport.initialize());

server.on('uncaughtException', (req, res, route, error) => {
  console.error(error.stack);
  res.send(new InternalServerError());
});

server.post('/api/auth/login', authenticate);
server.post('/api/auth/register', register);
server.post('/api/auth/activate', activate);
server.post('/api/auth/logout', logout);

server.get('/api/user/info', checkAuth, userInfo);

server.listen(process.env.PORT || 5001, () => {
  console.log('%s listening at %s', server.name, server.url);
});
