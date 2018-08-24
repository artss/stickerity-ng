import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { listType } from '../../proptypes/list';

import styles from './Lists.css';

export default class Item extends PureComponent {
  static propTypes = listType;

  static defaultProps = {
    color: 'fff',
  };

  state = {};

  render() {
    const { id, color, title } = this.props;

    return (
      <Link
        to={`/list/${id}`}
        className={styles.item}
        style={{ backgroundColor: `#${color}` }}
      >
        <div className={styles.itemTitle}>{title}</div>
      </Link>
    );
  }
}
