import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import Sticker from '../../components/Sticker';
import ListMenu from '../../components/ListMenu';
import { getIcon } from '../../components/types';

import s from './Board.css';

class BoardItem extends PureComponent {
  static propTypes = {
    ...listType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const {
      $id,
      $type,
      color,
      title,
      items,
    } = this.props;

    return (
      <Sticker color={color} className={s.item}>
        <Link to={`/lists/${$id}`} className={s.itemWrap}>
          <FontIcon
            className={cx(s.itemIcon, s[$type])}
            value={getIcon($type)}
          />

          <div className={s.itemInfo}>
            <div className={s.itemTitle}>{title}</div>

            <div className={s.itemQty}>
              {items.length > 0
                ? `${items.length} items`
                : 'No items'
              }
            </div>
          </div>
        </Link>

        <ListMenu $id={$id} />
      </Sticker>
    );
  }
}

function mapStateToProps({ items }, { $id }) {
  return { items: items[$id] };
}

export default connect(mapStateToProps)(BoardItem);
