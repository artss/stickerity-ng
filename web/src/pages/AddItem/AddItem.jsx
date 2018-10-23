import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { addItem } from '../../actions/items';
import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import { getPageComponent } from '../../components/types';

class AddItemPage extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType).isRequired,
    addItem: PropTypes.func.isRequired,
  };

  onChange = (item) => {
    const { list, addItem: add } = this.props;
    add(list.$id, item);
  }

  onDelete = () => {}

  render() {
    const { list } = this.props;

    const Item = getPageComponent(list.$type);

    return (
      <Item
        $listId={list.$id}
        onChange={this.onChange}
        onDelete={this.onDelete}
      />
    );
  }
}

function mapStateToProps({ lists }, { match: { params: { listId } } }) {
  const list = getListById(lists, listId);

  return { list };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addItem }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddItemPage));
