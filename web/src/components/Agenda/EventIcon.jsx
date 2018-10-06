import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';

import { eventTypes } from '../../constants/events';
import { eventTypeType } from '../../proptypes/event';

export default function EventIcon({ type }) {
  const { icon } = eventTypes[type];

  if (!icon) {
    return null;
  }

  return <FontIcon value={icon} />;
}

EventIcon.propTypes = {
  type: eventTypeType,
};

EventIcon.defaultProps = {
  type: null,
};
