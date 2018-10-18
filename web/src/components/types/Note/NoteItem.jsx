import React from 'react';
import { Link } from 'react-router-dom';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { noteType } from '../../../proptypes/note';
import { getPlainText } from '../../../selectors/notes';
import { firstWords } from '../../../util/format';

import styles from './NoteItem.css';

export default function NoteItem({
  $listId,
  $id,
  title,
  text,
}) {
  return (
    <li className={styles.root}>
      <IconMenu className={styles.menu} icon="more_vert" menuRipple>
        <MenuItem value="edit" icon="edit" caption="Edit note" />
        <MenuItem value="delete" icon="delete" caption="Delete note" />
      </IconMenu>

      <Link className={styles.link} to={`/lists/${$listId}/${$id}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>
          {firstWords(getPlainText(text), 20)}
        </div>
      </Link>
    </li>
  );
}

NoteItem.propTypes = noteType;
