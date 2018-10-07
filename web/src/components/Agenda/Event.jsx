import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { eventType } from '../../proptypes/event';

import EventIcon from './EventIcon';
import s from './Agenda.css';

export default class Event extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    ...eventType,
  };

  render() {
    const {
      $listId,
      $id,
      title,
      type,
      description,
    } = this.props;

    return (
      <Link className={s.event} to={`/lists/${$listId}/${$id}`}>
        <div className={s.eventIcon}>
          <EventIcon type={type} />
        </div>

        <div className={s.eventInfo}>
          <h2 className={s.eventTitle}>{title}</h2>

          {description && <div className={s.eventDescription}>{description}</div>}
        </div>
      </Link>
    );
  }
}
