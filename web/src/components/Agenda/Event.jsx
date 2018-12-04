import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { formatTime } from '../../util/format';
import { eventType } from '../../proptypes/event';

import EventIcon from './EventIcon';
import s from './Agenda.css';

export default class Event extends PureComponent {
  static propTypes = eventType;

  static defaultProps = {
    title: '',
    description: '',
    hour: 0,
    min: 0,
  };

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
