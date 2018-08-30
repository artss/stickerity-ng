import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';
import NoteItem from '../../components/record/Note/NoteItem';
import ChecklistItem from '../../components/record/Checklist/ChecklistItem';

import styles from './List.css';

const typeMapping = {
  Note: NoteItem,
  Checklist: ChecklistItem,
};

class List extends PureComponent {
  static propTypes = listType;

  render() {
    const {
      $id,
      $type,
      title,
      color,
      items,
    } = this.props;

    const Item = typeMapping[$type];

    return (
      <Sticker color={color} className={styles.root}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <h1 className={styles.title}>{title}</h1>

        <ul className={styles.items}>
          {items.map(item => (
            <Item key={item.$id} $listId={$id} {...item} />
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
