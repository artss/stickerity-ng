import PropTypes from 'prop-types';

export const eventTypeType = PropTypes.number;

export const eventType = {
  $listId: PropTypes.string,
  $id: PropTypes.string,
  $updatedAt: PropTypes.number,
  type: eventTypeType,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  hour: PropTypes.number,
  min: PropTypes.number,
  annual: PropTypes.bool,
  wholeDay: PropTypes.bool,
};
