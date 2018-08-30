import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';
import NoteItem from '../../components/record/Note/NoteItem';

import styles from './List.css';

class List extends PureComponent {
  static propTypes = listType;

  render() {
    const { title, color, items } = this.props;

    return (
      <Sticker color={color} className={styles.root}>
        <h1 className={styles.title}>{title}</h1>

        <ul className={styles.items}>
          {items.map(item => (
            <NoteItem key={item.$id} {...item} />
          ))}
        </ul>
      </Sticker>
    );
  }
}

function mapStateToProps({ lists }, { match: { params: { id } } }) {
  return lists.find(({ $id }) => $id === id);
}

export default withRouter(connect(mapStateToProps)(List));
