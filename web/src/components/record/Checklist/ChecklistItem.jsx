import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-toolbox/lib/checkbox';

export default function NoteItem({
  // $listId,
  // $id,
  checked,
  text,
}) {
  return (
    <li>
      <Checkbox checked={checked} label={text} />
    </li>
  );
}

NoteItem.propTypes = {
  // $listId: PropTypes.string.isRequired,
  // $id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
