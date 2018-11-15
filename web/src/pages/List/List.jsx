import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { updateItem } from '../../actions/items';
import Sticker from '../../components/Sticker';
import ListMenu from '../../components/ListMenu';
import ListNotFound from '../../components/ListNotFound';
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

  renderItems() {
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
    );
  }

  render() {
    const { list } = this.props;

    if (!list) {
      return <ListNotFound />;
    }

    const { $id, title, color } = list;

    return (
      <Sticker
        color={color}
        className={s.root}
        backUrl="/lists"
        title={title}
      >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <ListMenu $id={$id} />

        {this.renderItems()}
      </Sticker>
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId } } }) {
  return {
    list: getListById(lists, listId),
    items: items[listId],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
