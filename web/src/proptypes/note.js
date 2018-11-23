import PropTypes from 'prop-types';

export const noteType = {
  $listId: PropTypes.string,
  $id: PropTypes.string,
  $updatedAt: PropTypes.number,
  title: PropTypes.string,
  // TODO: text type
  text: PropTypes.object,
};
