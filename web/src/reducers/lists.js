import { saymyname } from '../util/saymyname';

export default saymyname({
  addList(state) {
    return state;
  },

  updateItem(state, $listId, $id, payload) {
    const newState = state.map((list) => {
      if (list.$id !== $listId) return list;
      const items = list.items.map(item => (item.$id === $id ? { ...item, ...payload } : item));
      return { ...list, items };
    });
    return newState;
  },
}, [], 'lists');
