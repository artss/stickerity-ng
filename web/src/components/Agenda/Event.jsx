import React, { PureComponent } from 'react';

import { eventType } from '../../proptypes/event';

import EventIcon from './EventIcon';
import s from './Agenda.css';

export default class Event extends PureComponent {
  static propTypes = eventType;

  render() {
    const { title, type, description } = this.props;

    return (
      <div className={s.event}>
        <div className={s.eventIcon}>
          <EventIcon type={type} />
        </div>

        <div className={s.eventInfo}>
          <h2 className={s.eventTitle}>{title}</h2>

          {description && <div className={s.eventDescription}>{description}</div>}
        </div>
      </div>
    );
  }
}
