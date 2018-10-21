import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { updateList } from '../../actions/lists';
import Sticker from '../../components/Sticker';
import ListForm from '../../components/ListForm';

import s from './EditList.css';

class EditList extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
    updateList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  onChange = (name, value) => {
    const { list: { $id }, updateList: update } = this.props;
    update($id, { [name]: value });
  }

  render() {
    const {
      list: { $id, $type, title },
      items,
    } = this.props;

    const headTitle = 'Edit List';

    return (
      <Sticker
        className={s.root}
        backUrl={`/lists/${$id}`}
        title={headTitle}
      >
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <ListForm
          $id={$id}
          $type={$type}
          title={title}
          items={items}
          onChange={this.onChange}
        />
      </Sticker>
    );
  }
}

function mapStateToProps({ lists, items }, { match: { params: { listId } } }) {
  return {
    list: getListById(lists, listId),
    items: items[listId],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateList }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditList));
