import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatTime } from '../../util/format';
import { eventType, eventDefaultProps } from '../../proptypes/event';

import EventIcon from './EventIcon';
import s from './Agenda.css';

export default class Event extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    ...eventType,
  };

  static defaultProps = eventDefaultProps;

  render() {
    const {
      $listId,
      $id,
      title,
      type,
      description,
      wholeDay,
      hour,
      min,
    } = this.props;

    return (
      <Link className={s.event} to={`/lists/${$listId}/${$id}`}>
        <div className={s.eventIcon}>
          <EventIcon type={type} />
        </div>

        <div className={s.eventInfo}>
          <div className={s.eventTime}>
            {wholeDay
              ? 'Whole day'
              : (formatTime(hour, min))
            }
          </div>

          <h2 className={s.eventTitle}>{title}</h2>

          {description && <div className={s.eventDescription}>{description}</div>}
        </div>
      </Link>
    );
  }
}
