import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import s from './Sortable.css';

export default class Placeholder extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
  };

  onDrop = () => {
    const { id, visible, onDrop } = this.props;
    if (!visible) {
      return;
    }
    onDrop(id);
  }

  render() {
    const { visible } = this.props;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={cx(s.placeholder, visible && s.visible)}
        onMouseUp={this.onDrop}
      />
    );
  }
}
