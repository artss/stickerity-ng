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
import ListNotFound from '../../components/ListNotFound';
import ListContent from '../List/ListContent';

import s from './EditList.css';

class EditList extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType),
    items: PropTypes.arrayOf(PropTypes.shape(itemType)),
    updateList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    list: null,
    items: [],
  };

  onChange = (name, value) => {
    const { list: { $id }, updateList: update } = this.props;
    update($id, { [name]: value });
  }

  render() {
    const { list, items } = this.props;

    if (!list) {
      return <ListNotFound />;
    }

    const { $id, $type, title } = list;

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

        <ListContent />
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
