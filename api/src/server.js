import fs from 'fs';
import restify from 'restify';
import CookieParser from 'restify-cookies';
import CORS from 'restify-cors-middleware';
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

const IS_DEV = process.env.NODE_ENV === 'development';

const server = restify.createServer({
  handleUncaughtExceptions: true,
  key: IS_DEV && fs.readFileSync('/srv/ssl/server.key'),
  certificate: IS_DEV && fs.readFileSync('/srv/ssl/server.crt'),
});

server.use(CookieParser.parse);
server.use(restify.plugins.bodyParser({ mapParams: false }));
server.use(passport.initialize());

const cors = CORS({
  preflightMaxAge: 10,
  origins: ['https://' + process.env.DOMAIN],
  allowHeaders: ['Authorization'],
  credentials: true,
});

server.pre(cors.preflight);
server.use(cors.actual);

server.on('uncaughtException', (req, res, route, error) => {
  console.error(error.stack);
  res.send(new InternalServerError());
});

server.post('/api/auth/login', authenticate);
server.post('/api/auth/register', register);
server.post('/api/auth/activate', activate);
server.post('/api/auth/logout', logout);

server.get('/api/user/info', checkAuth, userInfo);

server.listen(process.env.PORT || 5001, '0.0.0.0', () => {
  console.log('%s listening at %s', server.name, server.url);
});
