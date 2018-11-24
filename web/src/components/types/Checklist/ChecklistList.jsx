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
  sortItems,
} from '../../../actions/items';
import Sortable from '../../Sortable';
import ChecklistItem from './ChecklistItem';

import s from './ChecklistList.css';

class ChecklistList extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(checklistType)).isRequired,
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeId: props.items.length > 0
        ? props.items[0].$id
        : null,
    };

    this.itemRefs = {};
  }

  componentDidUpdate() {
    const { activeId } = this.state;

    if (activeId !== null && this.itemRefs[activeId]) {
      this.itemRefs[activeId].focus();
    }
  }

  refItem = ($id, el) => {
    this.itemRefs = { ...this.itemRefs, [$id]: el };
  }

  onItemFocus = ($id) => {
    this.setState({ activeId: $id });
  }

  onItemBlur = () => {
    this.setState({ activeId: null });
  }

  onItemChange = ($id, payload) => {
    const { $listId, updateItem: update } = this.props;
    update($listId, $id, payload);
  }

  onItemDelete = ($id) => {
    const { $listId, items, deleteItem: del } = this.props;
    del($listId, $id);

    const position = items.findIndex(item => item.$id === $id);
    this.setState({
      activeId: position > 0
        ? items[position - 1].$id
        : null,
    });
  }

  addItem = (after) => {
    const { $listId, addItem: add } = this.props;
    add($listId, { checked: false, text: '' }, after);

    if (typeof after === 'undefined') {
      return;
    }

    setTimeout(() => {
      const { items } = this.props;
      const position = items.findIndex(item => item.$id === after);

      this.setState({
        activeId: position < items.length
          ? items[position + 1].$id
          : null,
      });
    }, 0);
  }

  onSort = (ids, movedId) => {
    const { $listId, sortItems: sort } = this.props;
    sort($listId, ids, movedId);
  }

  onArrowUp = ($id) => {
    const { items } = this.props;

    const position = items.findIndex(item => item.$id === $id);

    if (position <= 0) {
      return;
    }

    this.setState({
      activeId: items[position - 1].$id,
    });
  }

  onArrowDown = ($id) => {
    const { items } = this.props;

    const position = items.findIndex(item => item.$id === $id);

    if (position >= items.length - 1) {
      return;
    }

    this.setState({
      activeId: items[position + 1].$id,
    });
  }

  render() {
    const { $listId, items } = this.props;

    return (
      <div className={s.root}>
        <Button
          className={s.addButton}
          icon="add"
          label="Add item"
          primary
          onClick={this.addItem}
        />

        <Sortable className={s.items} onSort={this.onSort}>
          {items.map((item, i) => (
            <ChecklistItem
              key={item.$id}
              reference={this.refItem}
              $listId={$listId}
              {...item}
              onFocus={this.onItemFocus}
              onBlur={this.onItemBlur}
              onChange={this.onItemChange}
              onDelete={this.onItemDelete}
              onInsert={this.addItem}
              onArrowUp={this.onArrowUp}
              onArrowDown={this.onArrowDown}
              focus={item.$active || i === 0}
            />
          ))}
        </Sortable>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addItem,
    updateItem,
    deleteItem,
    sortItems,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistList);
