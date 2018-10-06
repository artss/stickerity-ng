import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../proptypes/event';
import { weekDayShortNames } from '../../constants/dates';
import Event from './Event';

import s from './Agenda.css';

const eventSorter = (year, month, day) => (a, b) => (
  new Date(year, month - 1, day, a.hour, a.min)
  - new Date(year, month - 1, day, b.hour, b.min)
);

export default class Day extends PureComponent {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape(eventType)
    ).isRequired,
  };

  render() {
    const {
      year,
      month,
      day,
      events,
    } = this.props;

    const d = new Date(year, month - 1, day);

    const dayOfWeek = d.getDay() % 7;

    return (
      <div className={s.day}>
        <div className={s.dayWrap}>
          <div className={s.dayNumber}>{day}</div>
          <div className={s.dayOfWeek}>
            {weekDayShortNames[dayOfWeek]}
          </div>
        </div>

        <div className={s.events}>
          {events
            .sort(eventSorter(year, month, day))
            .map(event => <Event key={event.$id} {...event} />)
          }
        </div>
      </div>
    );
  }
}
