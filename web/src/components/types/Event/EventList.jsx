import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'react-toolbox/lib/date_picker/DatePicker';

import { MONDAY } from '../../../constants/dates';
import Calendar from '../../Calendar';
import styles from './EventList.css';

export default class EventList extends PureComponent {
  static propTypes = {
    // $listId: PropTypes.string.isRequired,
    // $id: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.number,
        month: PropTypes.number.isRequired,
        day: PropTypes.number.isRequired,
        annual: PropTypes.bool.isRequired,
        wholeDay: PropTypes.bool.isRequired,
      })
    ).isRequired,
  };

  onSelect = () => {}

  render() {
    const { items: allItems } = this.props;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const items = allItems
      .filter(({ annual, year, month }) => (
        month === currentMonth
        && (annual || year === currentYear)
      ))
      .sort((a, b) => (
        a.month * 31 + a.day < b.month * 31 + b.day
      ));

    return (
      <div className={styles.items}>
        <Calendar firstDayOfWeek={MONDAY} year={currentYear} month={currentMonth} items={items} />
      </div>
    );
  }
}
