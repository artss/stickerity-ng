import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';
import { getListComponent, getItemComponent } from '../../components/types';

import styles from './List.css';

class List extends PureComponent {
  static propTypes = listType;

  renderItems() {
    const { $id, $type, items } = this.props;

    const TypeList = getListComponent($type);

    if (TypeList) {
      return <TypeList items={items} />;
    }

    const Item = getItemComponent($type);

    return (
      <ul className={styles.items}>
        {items.map(item => (
          <Item key={item.$id} $listId={$id} {...item} />
        ))}
      </ul>
    );
  }

  render() {
    const {
      title,
      color,
    } = this.props;

    return (
      <Sticker color={color} className={styles.root}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <h1 className={styles.head}>
          <Link to="/">
            <IconButton className={styles.back} icon="arrow_back" />
          </Link>

          <div className={styles.title}>{title}</div>
        </h1>

        <IconMenu className={styles.menu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit list" />
          <MenuItem value="delete" icon="delete" caption="Delete list" />
        </IconMenu>

        {this.renderItems()}
      </Sticker>
    );
  }
}

function mapStateToProps({ lists }, { match: { params: { listId } } }) {
  return getListById(lists, listId);
}

export default withRouter(connect(mapStateToProps)(List));
