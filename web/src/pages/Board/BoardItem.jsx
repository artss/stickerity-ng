import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import Sticker from '../../components/Sticker';

import styles from './Board.css';

class BoardItem extends PureComponent {
  static propTypes = {
    ...listType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  };

  static defaultProps = {
    // color: 'fff',
    items: [],
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

function mapStateToProps({ items }, { $id }) {
  return { items: items[$id] };
}

export default connect(mapStateToProps)(BoardItem);
