import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';

import { navigate } from '../../../util/history';
import { monthFullNames, MONDAY } from '../../../constants/dates';
import { eventType } from '../../../proptypes/event';
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
      day: null,
    };
  }

  addItem = () => {
    const { $listId } = this.props;

    navigate(`/lists/${$listId}/add`);
  };

  onYearChange = (year) => {
    this.setState({ year: Number(year), day: null });
  };

  onMonthChange = (month) => {
    this.setState({ month: Number(month), day: null });
  };

  onMonthDecrement = () => {
    this.setState(({ year, month }) => {
      let m = month - 1;
      let y = year;

      if (m < 1) {
        m = 12;
        y -= 1;
      }

      return { year: y, month: m, day: null };
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

      return { year: y, month: m, day: null };
    });
  };

  onDayClick = (day) => {
    const { day: selectedDay } = this.state;
    this.setState({ day: day === selectedDay ? null : day });
  };

  render() {
    const { $listId, items } = this.props;
    const { year, month, day } = this.state;

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
            day={day}
            items={items}
            onDayClick={this.onDayClick}
          />
        </div>

        <Agenda
          $listId={$listId}
          year={year}
          month={month}
          day={day}
          items={items}
        />
      </div>
    );
  }
}
