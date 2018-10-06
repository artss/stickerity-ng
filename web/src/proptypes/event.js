import PropTypes from 'prop-types';

export const eventType = {
  year: PropTypes.number,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  annual: PropTypes.bool.isRequired,
  wholeDay: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
