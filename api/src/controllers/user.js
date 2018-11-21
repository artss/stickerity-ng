import { checkAuth } from './auth';

export function userInfo(req, res) {
  res.json(req.user);
}

export default (server) => {
  server.get('/api/user/info', checkAuth, userInfo);
};
