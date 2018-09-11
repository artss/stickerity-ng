import NoteItem from './Note/NoteItem';
import NotePage from './Note/NotePage';
import ChecklistItem from './Checklist/ChecklistItem';

const itemTypeMapping = {
  Note: NoteItem,
  Checklist: ChecklistItem,
};

const pageTypeMapping = {
  Note: NotePage,
};

export function getItemComponent($type) {
  return itemTypeMapping[$type];
}

export function getPageComponent($type) {
  return pageTypeMapping[$type];
}
