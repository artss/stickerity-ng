import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FontIcon from 'react-toolbox/lib/font_icon';

import s from './Sortable.css';

export default class SortableItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    isDragging: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragStop: PropTypes.func.isRequired,
  };

  state = {
    left: 0,
    top: 0,
    leftDelta: 0,
    topDelta: 0,
    rectX: 0,
    rectY: 0,
  };

  refElement = (el) => {
    this.el = el;
  }

  onDragStart = (e) => {
    document.addEventListener('mouseup', this.onDragStop);
    document.addEventListener('touchend', this.onDragStop);
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('touchmove', this.onDrag);
    const { id, onDragStart } = this.props;
    onDragStart(id);

    const ev = e.touches ? e.touches[0] : e;
    const rect = this.el.getBoundingClientRect();
    this.setState({
      rectX: rect.x,
      rectY: rect.y,
      leftDelta: ev.clientX - rect.x,
      topDelta: ev.clientY - rect.y,
    });
  }

  onDrag = (e) => {
    const {
      rectX,
      rectY,
      leftDelta,
      topDelta,
    } = this.state;

    const ev = e.touches ? e.touches[0] : e;
    this.setState({
      left: ev.clientX - rectX - leftDelta,
      top: ev.clientY - rectY - topDelta,
    });
  }

  onDragStop = () => {
    document.removeEventListener('mouseup', this.onDragStop);
    document.removeEventListener('touchend', this.onDragStop);
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('touchmove', this.onDrag);
    const { onDragStop } = this.props;
    onDragStop();
  }

  render() {
    const { isDragging, children } = this.props;
    const { left, top } = this.state;

    const style = isDragging ? { position: 'relative', left, top } : undefined;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        ref={this.refElement}
        className={cx(s.item, isDragging && s.dragging)}
      >
        <div
          className={s.itemInner}
          style={style}
        >
          <div
            type="button"
            className={s.handle}
            tabIndex={-1}
            onMouseDown={this.onDragStart}
            onTouchStart={this.onDragStart}
          >
            <FontIcon value="drag_indicator" />
          </div>

          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
