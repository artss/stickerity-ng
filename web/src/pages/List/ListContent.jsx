import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Button from 'react-toolbox/lib/button';

import { navigate } from '../../util/history';
import { getListById } from '../../selectors/lists';
import { getItems } from '../../selectors/items';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { updateItem } from '../../actions/items';
import { getListComponent, getItemComponent } from '../../components/types';

import s from './List.css';

class List extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType),
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
    updateItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: null,
    items: [],
  };

  addItem = () => {
    const { list: { $id } } = this.props;

    navigate(`/lists/${$id}/add`);
  }

  render() {
    const {
      list: { $id, $type },
      items,
      updateItem, // eslint-disable-line no-shadow
    } = this.props;

    const TypeList = getListComponent($type);

    if (TypeList) {
      return <TypeList $listId={$id} items={items} />;
    }

    const Item = getItemComponent($type);

    return (
      <Fragment>
        <Button
          icon="add"
          className={s.addButton}
          primary
          onClick={this.addItem}
        >
          Add {$type}
        </Button>

        <ul className={s.items}>
          {items.map(item => (
            <Item
              key={item.$id}
              $listId={$id}
              {...item}
              updateItem={updateItem}
            />
          ))}
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId } } }) {
  return {
    list: getListById(lists, listId),
    items: getItems(items[listId]),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
