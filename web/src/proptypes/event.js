import PropTypes from 'prop-types';

export const eventTypeType = PropTypes.number;

export const eventType = {
  $id: PropTypes.string.isRequired,
  type: eventTypeType,
  year: PropTypes.number,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  hour: PropTypes.number,
  min: PropTypes.number,
  annual: PropTypes.bool,
  wholeDay: PropTypes.bool,
};
