import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Sticker.css';

export default class Sticker extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  static defaultProps = {
    color: 'fff',
    className: null,
    children: null,
  };

  state = {};

  render() {
    const { color, className, children } = this.props;

    return (
      <div
        className={cx(styles.sticker, className)}
        style={{ backgroundColor: `#${color}` }}
      >
        {children}
      </div>
    );
  }
}
