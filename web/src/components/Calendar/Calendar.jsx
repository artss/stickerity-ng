import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button } from 'react-toolbox/lib/button';

import range from '../../util/range';
import * as dates from '../../constants/dates';
import { eventType } from '../../proptypes/event';

import s from './Calendar.css';

const weekDayNames = {
  [dates.SUNDAY]: 'SU',
  [dates.MONDAY]: 'MO',
  [dates.TUESDAY]: 'TU',
  [dates.WEDNESDAY]: 'WE',
  [dates.THURSDAY]: 'TH',
  [dates.FRIDAY]: 'FR',
  [dates.SATURDAY]: 'SA',
};

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
  };

  static defaultProps = {
    // day: null,
    firstDayOfWeek: dates.MONDAY,
    events: {},
  };

  onDayClick = () => {}

  render() {
    const {
      year,
      month,
      firstDayOfWeek,
      events,
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
              {weekDayNames[n % 7]}
            </div>
          ))
        }

        {range(skipDays).map(n => <div key={`skip${n}`} />)}

        {range(1, lastDay.getDate() + 1)
          .map(n => (
            <Button
              key={`day${n}`}
              className={cx(
                s.day,
                year === now.getFullYear()
                && month === now.getMonth() + 1
                && n === now.getDate()
                && s.today
              )}
            >
              <span className={s.dayNumber}>{n}</span>
              {events[n] && (
                <div className={s.dayEvents}>
                  {events[n].length}
                </div>
              )}
            </Button>
          ))
        }
      </div>
    );
  }
}
