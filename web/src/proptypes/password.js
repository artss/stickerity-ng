import PropTypes from 'prop-types';

export const passwordType = {
  $listId: PropTypes.string.isRequired,
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
