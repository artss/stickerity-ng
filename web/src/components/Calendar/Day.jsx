import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'react-toolbox/lib/button';

import { eventType } from '../../proptypes/event';

import s from './Calendar.css';

export default class Day extends PureComponent {
  static propTypes = {
    day: PropTypes.number.isRequired,
    today: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func,
    events: PropTypes.arrayOf(
      PropTypes.shape(eventType)
    ),
  };

  static defaultProps = {
    today: false,
    selected: false,
    events: null,
    onClick: null,
  };

  onClick = () => {
    const { onClick, day } = this.props;
    if (onClick) {
      onClick(day);
    }
  }

  render() {
    const { day, today, selected, events } = this.props;

    return (
      <Button
        className={cx(
          s.day,
          today && s.today,
          selected && s.selected
        )}
        onClick={this.onClick}
      >
        <span className={s.dayNumber}>{day}</span>

        {events && events.length > 0 && <div className={s.dayEvents} />}
      </Button>
    );
  }
}
