import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-toolbox/lib/button';

import { checklistType } from '../../../proptypes/checklist';
import {
  addItem,
  updateItem,
  deleteItem,
} from '../../../actions/items';
import ChecklistItem from './ChecklistItem';

import s from './ChecklistList.css';

class ChecklistList extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(checklistType)).isRequired,
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
  };

  state = {
    dragId: null,
  };

  items = {};

  refItem = ($id, item) => {
    this.items[$id] = item;
  }

  onItemChange = ($id, payload) => {
    const { $listId, updateItem: update } = this.props;
    update($listId, $id, payload);
  }

  onItemDelete = ($id) => {
    const { $listId, deleteItem: del } = this.props;
    del($listId, $id);
  }

  addItem = () => {
    const { $listId, addItem: add } = this.props;
    add($listId, { checked: false, text: '' });
  }

  onDragStart = (/* $id, e */) => {
    // this.setState({ dragId: $id });
  }

  onDragStop = () => {
    // this.setState({ dragId: null });
  }

  render() {
    const { $listId, items } = this.props;
    const { dragId } = this.state;

    return (
      <div className={s.root}>
        <Button
          className={s.addButton}
          icon="add"
          label="Add item"
          onClick={this.addItem}
        />

        <ul className={s.items}>
          {items.map((item, i) => (
            <ChecklistItem
              key={item.$id}
              reference={this.refItem}
              $listId={$listId}
              {...item}
              onChange={this.onItemChange}
              onDelete={this.onItemDelete}
              onDragStart={this.onDragStart}
              onDragStop={this.onDragStop}
              focus={i === 0}
            />
          ))}
        </ul>

        {dragId && React.cloneElement(this.items[dragId], { ref: () => {} })}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addItem, updateItem, deleteItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistList);
