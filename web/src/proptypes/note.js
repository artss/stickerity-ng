import PropTypes from 'prop-types';

export const noteType = {
  $listId: PropTypes.string.isRequired,
  $id: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
};