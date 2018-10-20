import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';
import BoardItem from './BoardItem';

import s from './Board.css';

class Board extends PureComponent {
  static propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape(listType)).isRequired,
  };

  render() {
    const { lists } = this.props;

    return (
      <div className={s.board}>
        <Helmet>
          <title>My Board</title>
        </Helmet>

        <Sticker className={s.addListButtonSticker}>
          <Link className={s.addListButton} to="/lists/add">
            <FontIcon value="add" className={s.addListButtonIcon} />
            <div className={s.addListButtonText}>Add list</div>
          </Link>
        </Sticker>

        {lists.map(list => (
          <BoardItem
            key={list.$id}
            {...list}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ lists }) {
  return { lists };
}

export default connect(mapStateToProps)(Board);
