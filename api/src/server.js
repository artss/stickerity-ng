import restify from 'restify';
import { InternalServerError } from 'restify-errors';
import passport from 'passport';

import {
  authenticate,
  checkAuth,
  register,
  activate,
} from './auth';

const server = restify.createServer({
  handleUncaughtExceptions: true,
});

// server.use(restify.queryParser());
server.use(restify.plugins.bodyParser({ mapParams: false }));
server.use(passport.initialize());

server.on('uncaughtException', (req, res, route, error) => {
  console.error(error.stack);
  res.send(new InternalServerError());
});

server.post('/api/auth/login', authenticate);

server.get('/api/user', checkAuth, (req, res) => {
  res.send(res.user);
});

server.post('/api/auth/register', register);
server.post('/api/auth/activate', activate);

server.listen(process.env.PORT || 5001, () => {
  console.log('%s listening at %s', server.name, server.url);
});
