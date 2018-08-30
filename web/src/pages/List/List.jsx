import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { listType } from '../../proptypes/list';
import Sticker from '../../components/Sticker';

import styles from './List.css';

class List extends PureComponent {
  static propTypes = listType;

  render() {
    const { title, color } = this.props;

    return (
      <Sticker color={color} className={styles.list}>
        <h1 className={styles.title}>{title}</h1>
      </Sticker>
    );
  }
}

function mapStateToProps({ lists }, { match: { params: { id } } }) {
  return lists.find(item => item.id == id);
}

export default withRouter(connect(mapStateToProps)(List));
