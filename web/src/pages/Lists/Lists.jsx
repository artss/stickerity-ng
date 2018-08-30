import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listType } from '../../proptypes/list';

import Item from './Item';

import styles from './Lists.css';

class Lists extends PureComponent {
  static propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape(listType)).isRequired,
  };

  render() {
    const { lists } = this.props;

    return (
      <div className={styles.lists}>
        {lists.map(list => (
          <Item
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

export default connect(mapStateToProps)(Lists);
