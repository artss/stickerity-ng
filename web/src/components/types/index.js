// import EventList from './Event/EventList';
import NoteItem from './Note/NoteItem';
import NotePage from './Note/NotePage';
import ChecklistItem from './Checklist/ChecklistItem';
import PasswordItem from './Password/PasswordItem';
import EventList from './Event/EventList';

// TODO: dynamic import
const listTypeMapping = {
  Event: EventList,
};

const itemTypeMapping = {
  Note: NoteItem,
  Checklist: ChecklistItem,
  Password: PasswordItem,
};

const pageTypeMapping = {
  Note: NotePage,
};

export function getListComponent($type) {
  return listTypeMapping[$type];
}

export function getItemComponent($type) {
  return itemTypeMapping[$type];
}

export function getPageComponent($type) {
  return pageTypeMapping[$type];
}
