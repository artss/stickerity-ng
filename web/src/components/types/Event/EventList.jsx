import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'react-toolbox/lib/date_picker/DatePicker';

import { MONDAY } from '../../../constants/dates';
import { eventType } from '../../../proptypes/event';
import Calendar from '../../Calendar';
import styles from './EventList.css';

export default class EventList extends PureComponent {
  static propTypes = {
    // $listId: PropTypes.string.isRequired,
    // $id: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(eventType)).isRequired,
  };

  onSelect = () => {}

  render() {
    const { items } = this.props;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // TODO: selector
    const events = items
      .filter(({ annual, year, month }) => (
        month === currentMonth
        && (annual || year === currentYear)
      ))
      .reduce(
        (acc, item) => {
          if (!acc[item.day]) {
            acc[item.day] = [];
          }
          acc[item.day].push(item);
          return acc;
        },
        {}
      );

    return (
      <div className={styles.items}>
        <Calendar firstDayOfWeek={MONDAY} year={currentYear} month={currentMonth} events={events} />
      </div>
    );
  }
}
