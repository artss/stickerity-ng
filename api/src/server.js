import restify from 'restify';
import { InternalServerError } from 'restify-errors';
import passport from 'passport';

import { authenticate, checkAuth } from './auth';

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

server.get('/api', (req, res) => {
  res.json({ test: 2 });
});

server.post('/api/auth/login', authenticate);

server.get('/api/user', checkAuth, (req, res) => {
  console.log('++++++ AUTH', req.user);
  res.send(res.user);
});

server.listen(process.env.PORT || 5001, () => {
  console.log('%s listening at %s', server.name, server.url);
});
