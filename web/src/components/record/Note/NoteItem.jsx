import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

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
        <div className={styles.text}>{text}</div>
      </Link>
    </li>
  );
}

NoteItem.propTypes = {
  $listId: PropTypes.string.isRequired,
  $id: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};
