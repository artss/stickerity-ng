import PropTypes from 'prop-types';

export const eventType = {
  $id: PropTypes.string.isRequired,
  year: PropTypes.number,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  annual: PropTypes.bool.isRequired,
  wholeDay: PropTypes.bool.isRequired,
  hour: PropTypes.number,
  min: PropTypes.number,
  type: PropTypes.string,
};
