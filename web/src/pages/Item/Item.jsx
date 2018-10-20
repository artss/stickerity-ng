import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getListById } from '../../selectors/lists';
import { getItemById } from '../../selectors/items';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { getPageComponent } from '../../components/types';

class ItemPage extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType).isRequired,
    item: PropTypes.shape(itemType).isRequired,
  };

  render() {
    const { list, item } = this.props;

    const Item = getPageComponent(list.$type);

    return (
      <Item key={item.$id} $listId={list.$id} {...item} />
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId, itemId } } }) {
  const list = getListById(lists, listId);
  const item = getItemById(items[listId], itemId);

  return { list, item };
}

export default withRouter(connect(mapStateToProps)(ItemPage));
