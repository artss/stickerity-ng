import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button } from 'react-toolbox/lib/button';
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
          <Button className={s.addListButton} onClick={this.addList}>
            <FontIcon value="add" className={s.addListButtonIcon} />
            <div className={s.addListButtonText}>Add list</div>
          </Button>
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
