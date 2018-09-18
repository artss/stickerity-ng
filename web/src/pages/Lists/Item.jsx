import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';

import styles from './Lists.css';

export default class Item extends PureComponent {
  static propTypes = listType;

  static defaultProps = {
    color: 'fff',
  };

  state = {};

  render() {
    const {
      $id,
      color,
      title,
      items,
    } = this.props;

    return (
      <Sticker color={color} className={styles.item}>
        <Link to={`/lists/${$id}`} className={styles.itemTitle}>{title}</Link>

        <div className={styles.itemQty}>
          {items.length > 0
            ? `${items.length} items`
            : 'No items'
          }
        </div>

        <IconMenu className={styles.itemMenu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit" />
          <MenuItem value="delete" icon="delete" caption="Delete" />
        </IconMenu>
      </Sticker>
    );
  }
}
