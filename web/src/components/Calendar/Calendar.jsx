import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import range from '../../util/range';
import { weekDayShortNames, MONDAY } from '../../constants/dates';
import { eventType } from '../../proptypes/event';
import Day from './Day';
import s from './Calendar.css';

export default class Calendar extends PureComponent {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    // day: PropTypes.number,
    firstDayOfWeek: PropTypes.number,
    events: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape(eventType)
      )
    ),
    onDayClick: PropTypes.func,
  };

  static defaultProps = {
    // day: null,
    firstDayOfWeek: MONDAY,
    events: {},
    onDayClick: null,
  };

  render() {
    const {
      year,
      month,
      firstDayOfWeek,
      events,
      onDayClick,
    } = this.props;

    const now = new Date();
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const skipDays = ((firstDay.getDay() || 7) - firstDayOfWeek) % 7;

    return (
      <div className={s.monthCalendar}>
        {range(firstDayOfWeek, firstDayOfWeek + 7)
          .map(n => (
            <div
              key={`weekDayName${n}`}
              className={s.weekDayName}
            >
              {weekDayShortNames[n % 7]}
            </div>
          ))
        }

        {range(skipDays).map(n => <div key={`skip${n}`} />)}

        {range(1, lastDay.getDate() + 1)
          .map(n => (
            <Day
              key={`day${n}`}
              day={n}
              today={
                year === now.getFullYear()
                && month === now.getMonth() + 1
                && n === now.getDate()
              }
              events={events[n]}
              onClick={onDayClick}
            />
          ))
        }
      </div>
    );
  }
}
