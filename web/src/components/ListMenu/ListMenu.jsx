import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { getListById } from '../../selectors/lists';
import { deleteList } from '../../actions/lists';
import { navigate } from '../../util/history';

import DeleteDialogButton from '../DeleteDialogButton';
import s from './ListMenu.css';

class ListMenu extends PureComponent {
  static propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deleteList: PropTypes.func.isRequired,
  };

  onAddItemClick = () => {
    const { $id } = this.props;
    navigate(`/lists/${$id}/add`);
  }

  onEditClick = () => {
    const { $id } = this.props;
    navigate(`/lists/${$id}/edit`);
  }

  onDelete = () => {
    const { $id, deleteList: del } = this.props;
    navigate('/lists', null, true);
    del($id);
  }

  render() {
    const { title } = this.props;

    return (
      <Fragment>
        <IconMenu theme={s} className={s.root} icon="more_vert" menuRipple>
          <MenuItem
            icon="add"
            theme={s}
            caption="Add item"
            onClick={this.onAddItemClick}
          />

          <MenuItem
            icon="tune"
            theme={s}
            caption="List settings"
            onClick={this.onEditClick}
          />

          <DeleteDialogButton
            title={title}
            className={s.deleteButton}
            action={this.onDelete}
          >
            <MenuItem
              icon="delete_outline"
              theme={s}
              caption="Delete list"
              onClick={this.onDeleteClick}
            />
          </DeleteDialogButton>
        </IconMenu>

      </Fragment>
    );
  }
}

function mapStateToProps({ lists }, { $id }) {
  const { title } = getListById(lists, $id);
  return { title };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
