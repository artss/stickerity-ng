import PropTypes from 'prop-types';

export const checklistType = {
  $listId: PropTypes.string,
  $id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
