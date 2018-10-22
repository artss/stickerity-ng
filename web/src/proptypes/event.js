import PropTypes from 'prop-types';

export const eventTypeType = PropTypes.number;

export const eventType = {
  $id: PropTypes.string,
  type: eventTypeType,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  hour: PropTypes.number,
  min: PropTypes.number,
  annual: PropTypes.bool,
  wholeDay: PropTypes.bool,
};

export const eventDefaultProps = {
  title: '',
  description: '',
  hour: 0,
  min: 0,
};
