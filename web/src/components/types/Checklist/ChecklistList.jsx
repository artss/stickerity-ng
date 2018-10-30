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

  onSort = (ids) => {
    const { $listId, sortItems: sort } = this.props;
    sort($listId, ids);
  }

  render() {
    const { $listId, items } = this.props;

    return (
      <div className={s.root}>
        <Button
          className={s.addButton}
          icon="add"
          label="Add item"
          onClick={this.addItem}
        />

        <Sortable className={s.items} onSort={this.onSort}>
          {items.map((item, i) => (
            <ChecklistItem
              key={item.$id}
              $listId={$listId}
              {...item}
              onChange={this.onItemChange}
              onDelete={this.onItemDelete}
              focus={i === 0}
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
