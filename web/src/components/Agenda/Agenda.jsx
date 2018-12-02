import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { eventType } from '../../proptypes/event';
import { UPCOMING_EVENTS_LIMIT } from '../../constants/events';
import { getUpcomingEvents } from '../../selectors/events';

import Day from './Day';
import s from './Agenda.css';

class Agenda extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
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
      events,
    } = this.props;

    return (
      <div className={s.root}>
        {Object.keys(events)
          .map((dayKey) => {
            if (!events[dayKey] || events[dayKey].length === 0) {
              return null;
            }

            const { month, day } = events[dayKey][0];

            return (
              <Day
                key={dayKey}
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

function mapStateToProps(state, { items, year, month }) {
  return { events: getUpcomingEvents(items, year, month, UPCOMING_EVENTS_LIMIT) };
}

export default connect(mapStateToProps)(Agenda);