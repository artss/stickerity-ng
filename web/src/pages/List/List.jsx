import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { updateItem } from '../../actions/items';
import Sticker from '../../components/Sticker';
import { getListComponent, getItemComponent } from '../../components/types';

import s from './List.css';

class List extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)).isRequired,
  };

  renderItems() {
    const {
      list: {
        $id,
        $type,
      },
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
    const {
      list: {
        title,
        color,
      },
    } = this.props;

    return (
      <Sticker
        color={color}
        className={s.root}
        backUrl="/"
        title={title}
      >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <IconMenu className={s.menu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit list" />
          <MenuItem value="delete" icon="delete" caption="Delete list" />
        </IconMenu>

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
