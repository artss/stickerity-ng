import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { getListById } from '../../selectors/lists';
import { getItemById } from '../../selectors/items';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import Sticker from '../../components/Sticker';
import { getPageComponent } from '../../components/types';

import styles from './Item.css';

class ItemPage extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType).isRequired,
    item: PropTypes.shape(itemType).isRequired,
  };

  render() {
    const { list, item } = this.props;

    const Item = getPageComponent(list.$type);

    const title = Item.getTitle(item);

    return (
      <Sticker color={list.color} className={styles.root}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <h1 className={styles.head}>
          <Link to={`/lists/${list.$id}`}>
            <IconButton className={styles.back} icon="arrow_back" />
          </Link>

          <div className={styles.title}>{title}</div>
        </h1>

        <IconMenu className={styles.menu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit" />
          <MenuItem value="delete" icon="delete" caption="Delete" />
        </IconMenu>

        <Item key={item.$id} $listId={list.$id} {...item} />
      </Sticker>
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId, itemId } } }) {
  const list = getListById(lists, listId);
  const item = getItemById(items[listId], itemId);

  return { list, item };
}

export default withRouter(connect(mapStateToProps)(ItemPage));
