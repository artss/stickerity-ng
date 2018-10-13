import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

import { eventTypes } from '../../constants/events';
import { eventTypeType } from '../../proptypes/event';

export default function EventIcon({ type }) {
  const { icon } = eventTypes[type];
  return icon ? <FontIcon value={icon} /> : null;
}

EventIcon.propTypes = {
  type: eventTypeType,
};

EventIcon.defaultProps = {
  type: null,
};
