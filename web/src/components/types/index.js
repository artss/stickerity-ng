import NoteItem from './Note/NoteItem';
import ChecklistItem from './Checklist/ChecklistItem';

const itemTypeMapping = {
  Note: NoteItem,
  Checklist: ChecklistItem,
};

export default function getItemComponent($type) {
  return itemTypeMapping[$type];
}
