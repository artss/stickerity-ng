import PropTypes from 'prop-types';

export const listType = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

