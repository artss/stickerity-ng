import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { eventType } from '../../proptypes/event';

import Day from './Day';
import s from './Agenda.css';

export default class Agenda extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
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
      events,
    } = this.props;

    return (
      <div className={s.root}>
        {Object.keys(events)
          .sort((a, b) => a - b)
          .map((dayKey) => {
            const d = new Date(Number(dayKey));
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const day = d.getDate();

            return (
              <Day
                key={day}
                $listId={$listId}
                year={year}
                month={month}
                day={day}
                events={events[dayKey]}
              />
            );
          })
        }
      </div>
    );
  }
}
