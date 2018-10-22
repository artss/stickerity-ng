import PropTypes from 'prop-types';

export const noteType = {
  $listId: PropTypes.string,
  $id: PropTypes.string,
  title: PropTypes.string,
  // TODO: text type
  text: PropTypes.object,
};
