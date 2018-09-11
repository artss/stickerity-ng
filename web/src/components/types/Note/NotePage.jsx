import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { IconButton } from 'react-toolbox/lib/button';
// import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import styles from './NotePage.css';

export default class NotePage extends PureComponent {
  static propTypes = {
    // $listId: PropTypes.string.isRequired,
    // $id: PropTypes.string.isRequired,
    // title: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    // title: null,
  };

  static getTitle({ title, text }) {
    return title || text.substr(0, 16);
  }

  render() {
    const {
    // $listId,
    // $id,
      // title,
      text,
    } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.text}>{text}</div>
      </div>
    );
  }
}
