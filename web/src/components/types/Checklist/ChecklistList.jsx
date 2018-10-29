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

  render() {
    const { $listId, items } = this.props;

    return (
      <div className={s.root}>
        <Button icon="add" label="Add item" onClick={this.addItem} />

        <ul className={s.items}>
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
        </ul>
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
