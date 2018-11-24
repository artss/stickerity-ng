import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import { getListById } from '../../selectors/lists';
import { listType } from '../../proptypes/list';
import { updateItem } from '../../actions/items';
import Sticker from '../../components/Sticker';
import ListMenu from '../../components/ListMenu';
import ListNotFound from '../../components/ListNotFound';
import ListContent from './ListContent';

import s from './List.css';

class List extends PureComponent {
  static propTypes = {
    list: PropTypes.shape(listType),
  };

  static defaultProps = {
    list: null,
  };

  render() {
    const { list } = this.props;

    if (!list) {
      return <ListNotFound />;
    }

    const { $id, title, color } = list;

    return (
      <Sticker
        color={color}
        className={s.root}
        backUrl="/lists"
        title={title}
      >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <ListMenu $id={$id} />

        <ListContent />
      </Sticker>
    );
  }
}

function mapStateToProps({ lists }, { match: { params: { listId } } }) {
  return {
    list: getListById(lists, listId),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
