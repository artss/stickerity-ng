import React, { Children, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import range from '../../util/range';
import SortableItem from './SortableItem';
import Placeholder from './Placeholder';
import s from './Sortable.css';

export default class Sortable extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSort: PropTypes.func.isRequired,
  };

  state = {
    dragging: null,
  };

  onDragStart = (id) => {
    this.setState({ dragging: id });
  }

  onDragStop = () => {
    this.setState({ dragging: null });
  }

  onDrop = (id) => {
    const { children, onSort } = this.props;
    const { dragging } = this.state;

    let ids = range(children.length)
      .map(i => (i === dragging ? null : i));
    ids.splice(id, 0, dragging);
    ids = ids.filter(i => i !== null);

    onSort(ids);
  }

  render() {
    const { children } = this.props;
    const { dragging } = this.state;

    return (
      <div className={s.sortable}>
        {Children.map(children, (child, i) => (
          <Fragment key={child.key || i}>
            <Placeholder
              id={i}
              visible={dragging !== null}
              onDrop={this.onDrop}
            />

            <SortableItem
              id={i}
              isDragging={i === dragging}
              onDragStart={this.onDragStart}
              onDragStop={this.onDragStop}
            >
              {child}
            </SortableItem>
          </Fragment>
        ))}

        <Placeholder
          id={children.length}
          visible={dragging !== null}
          onDrop={this.onDrop}
        />
      </div>
    );
  }
}
