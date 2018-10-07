import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { IconButton } from 'react-toolbox/lib/button';
// import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { eventType } from '../../../proptypes/event';

import s from './EventPage.css';

export default class EventPage extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    ...eventType,
  };

  static defaultProps = {
    // title: null,
  };

  static getTitle({ title, description }) {
    return title || description.substr(0, 16);
  }

  render() {
    const {
    // $listId,
    // $id,
      // title,
      description,
    } = this.props;

    return (
      <div className={s.root}>
        <div className={s.description}>{description}</div>
      </div>
    );
  }
}
