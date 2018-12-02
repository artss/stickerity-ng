import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

import { navigate } from '../../../util/history';
import { monthFullNames, MONDAY } from '../../../constants/dates';
import { UPCOMING_EVENTS_LIMIT } from '../../../constants/events';
import { eventType } from '../../../proptypes/event';
import { getMonthEvents, getUpcomingEvents } from '../../../selectors/events';
import Calendar from '../../Calendar';
import Agenda from '../../Agenda';
import s from './EventList.css';

const months = monthFullNames
  .map((label, i) => ({ label, value: i + 1 }));

export default class EventList extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(eventType)).isRequired,
  };

  constructor(props) {
    super(props);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    this.state = {
      year,
      month,
    };
  }

  addItem = () => {
    const { $listId } = this.props;

    navigate(`/lists/${$listId}/add`);
  };

  onYearChange = (year) => {
    this.setState({ year: Number(year) });
  };

  onMonthChange = (month) => {
    this.setState({ month: Number(month) });
  };

  onMonthDecrement = () => {
    this.setState(({ year, month }) => {
      let m = month - 1;
      let y = year;

      if (m < 1) {
        m = 12;
        y -= 1;
      }

      return { year: y, month: m };
    });
  };

  onMonthIncrement = () => {
    this.setState(({ year, month }) => {
      let m = month + 1;
      let y = year;

      if (m > 12) {
        m = 1;
        y += 1;
      }

      return { year: y, month: m };
    });
  };

  onDayClick = () => {};

  render() {
    const { $listId, items } = this.props;
    const { year, month } = this.state;

    const monthEvents = getMonthEvents(items, year, month);
    const events = getUpcomingEvents(items, year, month, UPCOMING_EVENTS_LIMIT);

    return (
      <div className={s.root}>

        <Button
          icon="add"
          className={s.addButton}
          primary
          onClick={this.addItem}
        >
          Add event
        </Button>

        <div className={s.calendarWrap}>
          <div className={s.dateSelector}>
            <IconButton
              className={s.selectorButton}
              icon="keyboard_arrow_left"
              onClick={this.onMonthDecrement}
            />

            <Dropdown
              className={s.monthSelector}
              value={month}
              source={months}
              onChange={this.onMonthChange}
            />

            <Input
              className={s.yearSelector}
              type="number"
              value={year}
              onChange={this.onYearChange}
            />

            <IconButton
              className={s.selectorButton}
              icon="keyboard_arrow_right"
              onClick={this.onMonthIncrement}
            />
          </div>

          <Calendar
            firstDayOfWeek={MONDAY}
            year={year}
            month={month}
            events={monthEvents}
            onDayClick={this.onDayClick}
          />
        </div>

        <Agenda
          $listId={$listId}
          events={events}
        />
      </div>
    );
  }
}
