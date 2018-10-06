import React, { PureComponent } from 'react';

import { eventType } from '../../proptypes/event';

import s from './Agenda.css';

export default class Event extends PureComponent {
  static propTypes = eventType;

  render() {
    const { title, description } = this.props;

    return (
      <div className={s.event}>
        <h2 className={s.eventTitle}>{title}</h2>

        {description && <div className={s.eventDescription}>{description}</div>}
      </div>
    );
  }
}
