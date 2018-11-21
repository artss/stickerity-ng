import db from '../models';
import { checkAuth } from './auth';

export async function getLists(req, res) {
  const lists = await db.Lists.findOne({
    where: { userId: req.user.id },
    attributes: ['data'],
  });

  try {
    res.json(JSON.parse(lists.data));
  } catch (e) {
    console.error(e);
    res.json({});
  }
}

export async function saveLists(req, res) {
  const result = await db.Lists.upsert({
    data: req.body.data,
    userId: req.user.id,
  });

  res.json(result);
}

export default (server) => {
  server.get('/api/lists', checkAuth, getLists);
  server.post('/api/lists', checkAuth, saveLists);
};
