import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Month from 'react-toolbox/lib/date_picker/CalendarMonth';

import styles from './EventList.css';

/* eslint-disable react/prefer-stateless-function, react/no-unused-prop-types */

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

  render() {
    // const { items } = this.props;

    return (
      <div className={styles.items}>
        <Month sundayFirstDayOfWeek={false} />
      </div>
    );
  }
}
