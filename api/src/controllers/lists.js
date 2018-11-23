import db from '../models';
import { checkAuth } from './auth';

export async function getLists(req, res) {
  const userId = req.user.id;

  const lists = await db.Lists.findOne({
    where: { userId },
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
  const userId = req.user.id;
  const { data } = req.body;

  const lists = await db.Lists.findOne({
    where: { userId },
    attributes: ['id', 'data'],
  });

  if (lists) {
    await lists.update({ data });
  } else {
    await db.Lists.create({
      userId,
      data,
    });
  }

  res.json({ ok: true });
}

export default (server) => {
  server.get('/api/lists', checkAuth, getLists);
  server.post('/api/lists', checkAuth, saveLists);
};
