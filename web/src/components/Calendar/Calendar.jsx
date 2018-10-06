import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import range from '../../util/range';
import * as dates from '../../constants/dates';

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
  };

  static defaultProps = {
    // day: null,
    firstDayOfWeek: dates.MONDAY,
  };

  onDayClick = () => {}

  render() {
    const { year, month, firstDayOfWeek } = this.props;

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
          .map(n => <div key={`day${n}`}>{n}</div>)
        }
      </div>
    );
  }
}
