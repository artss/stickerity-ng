import db from '../models';
import { checkAuth } from './auth';

export async function getItems(req, res) {
  const userId = req.user.id;
  const { listId } = req.params;

  const items = await db.Items.findOne({
    where: { userId, listId },
    attributes: ['data'],
  });

  try {
    res.json(JSON.parse(items.data));
  } catch (e) {
    console.error(e);
    res.json(404, {});
  }
}

export async function saveItems(req, res) {
  const userId = req.user.id;
  const { listId } = req.params;
  const { data } = req.body;

  const items = await db.Items.findOne({
    where: { userId, listId },
    attributes: ['id', 'data'],
  });

  if (items) {
    await items.update({ data });
  } else {
    await db.Items.create({
      userId,
      listId,
      data,
    });
  }

  res.json({ ok: true });
}

export default (server) => {
  server.get('/api/items/:listId', checkAuth, getItems);
  server.post('/api/items/:listId', checkAuth, saveItems);
};
