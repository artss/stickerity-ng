import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { updateItem, deleteItem } from '../../actions/items';
import { getListById } from '../../selectors/lists';
import { getItemById } from '../../selectors/items';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { navigate } from '../../util/history';
import { getPageComponent } from '../../components/types';
import ItemNotFound from '../../components/ItemNotFound';

class ItemPage extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType),
    item: PropTypes.shape(itemType),
  };

  static defaultProps = {
    list: null,
    item: null,
  };

  onChange = (payload) => {
    const { list, item, updateItem: update } = this.props;
    update(list.$id, item.$id, payload);
  };

  onDelete = () => {
    const { list, item, deleteItem: del } = this.props;
    navigate(`/lists/${list.$id}`, null, true);
    del(list.$id, item.$id);
  };

  render() {
    const { list, item } = this.props;

    if (!list || !item) {
      return <ItemNotFound />;
    }

    const Item = getPageComponent(list.$type);

    return (
      <Item
        key={item.$id}
        $listId={list.$id}
        onChange={this.onChange}
        onDelete={this.onDelete}
        {...item}
      />
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId, itemId } } }) {
  const list = getListById(lists, listId);
  const item = list && items && items[listId] && getItemById(items[listId], itemId);

  return { list, item };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem, deleteItem }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemPage));
