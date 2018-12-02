import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { eventType } from '../../proptypes/event';
import { monthShortNames, weekDayShortNames } from '../../constants/dates';

import Event from './Event';

import s from './Agenda.css';

const eventSorter = (year, month, day) => (a, b) => (
  new Date(year, month - 1, day, a.hour, a.min)
  - new Date(year, month - 1, day, b.hour, b.min)
);

export default class Day extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    day: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape(eventType)
    ).isRequired,
  };

  render() {
    const {
      $listId,
      year,
      month,
      day,
      events,
    } = this.props;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const d = new Date(year, month - 1, day);

    const dayOfWeek = d.getDay() % 7;

    return (
      <div className={cx(s.day, d < today && s.past)}>
        <div className={s.dayWrap}>
          <div className={s.dayNumber}>{day}</div>
          <div className={s.month}>
            {monthShortNames[month - 1]}
          </div>
          <div className={s.dayOfWeek}>
            {weekDayShortNames[dayOfWeek]}
          </div>
        </div>

        <div className={s.events}>
          {events
            .sort(eventSorter(year, month, day))
            .map(event => <Event key={event.$id} $listId={$listId} {...event} />)
          }
        </div>
      </div>
    );
  }
}
