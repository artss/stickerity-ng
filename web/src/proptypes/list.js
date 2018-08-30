import PropTypes from 'prop-types';

export const listType = {
  $id: PropTypes.string.isRequired,
  $type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

