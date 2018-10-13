import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../proptypes/event';

import Day from './Day';
import s from './Agenda.css';

export default class Agenda extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    events: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape(eventType)
      )
    ),
  };

  static defaultProps = {
    events: {},
  };

  render() {
    const {
      $listId,
      year,
      month,
      events,
    } = this.props;

    return (
      <div className={s.root}>
        {Object.keys(events)
          .sort((a, b) => a - b)
          .map(day => (
            <Day
              key={day}
              $listId={$listId}
              year={year}
              month={month}
              day={Number(day)}
              events={events[day]}
            />
          ))
        }
      </div>
    );
  }
}
