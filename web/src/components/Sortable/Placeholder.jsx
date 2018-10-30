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

  state = {
    hover: false,
  };

  componentDidMount() {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchend', this.onTouchEnd);
  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
  }

  refDropArea = (el) => {
    this.dropArea = el;
  }

  onTouchMove = (e) => {
    const { visible } = this.props;
    if (!visible) {
      return;
    }

    const y = e.touches[0].clientY;
    const rect = this.dropArea.getBoundingClientRect();
    const hover = y >= rect.top && y <= rect.bottom;
    this.setState({ hover });
  }

  onTouchEnd = () => {
    const { id, visible, onDrop } = this.props;
    if (!visible) {
      return;
    }

    const { hover } = this.state;
    if (!hover) {
      return;
    }

    onDrop(id);
    this.setState({ hover: false });
  }

  onMouseEnter = () => {
    this.setState({ hover: true });
  }

  onMouseLeave = () => {
    this.setState({ hover: false });
  }

  onDrop = () => {
    const { id, visible, onDrop } = this.props;
    if (!visible) {
      return;
    }
    onDrop(id);
    this.setState({ hover: false });
  }

  render() {
    const { visible } = this.props;
    const { hover } = this.state;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={cx(s.placeholder, visible && s.visible, hover && s.hover)}
        onMouseUp={this.onDrop}
      >
        <div
          ref={this.refDropArea}
          className={s.dropArea}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      </div>
    );
  }
}
