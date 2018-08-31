import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';

import styles from './NoteItem.css';

export default function NoteItem({
  $listId,
  $id,
  title,
  text,
}) {
  return (
    <li className={styles.root}>
      <Link className={styles.link} to={`/lists/${$listId}/${$id}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
      </Link>

      <div className={styles.actions}>
        <IconButton className={styles.actionEdit} icon="edit" />
        <IconButton className={styles.actionDelete} icon="delete" />
      </div>
    </li>
  );
}

NoteItem.propTypes = {
  $listId: PropTypes.string.isRequired,
  $id: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};
