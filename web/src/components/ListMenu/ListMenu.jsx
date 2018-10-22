import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import Dialog from 'react-toolbox/lib/dialog';

import { getListById } from '../../selectors/lists';
import { deleteList } from '../../actions/lists';
import { navigate } from '../../util/history';

import s from './ListMenu.css';

class ListMenu extends PureComponent {
  static propTypes = {
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    deleteList: PropTypes.func.isRequired,
  };

  state = {
    showDialog: false,
  };

  actions = [
    {
      label: 'No, thanks',
      onClick: () => {
        this.setState({ showDialog: false });
      },
    },

    {
      label: 'Yes, please',
      onClick: () => {
        const { $id, deleteList: del } = this.props;
        navigate('/');
        del($id);
      },
    },
  ];

  onAddItemClick = () => {

  }

  onEditClick = () => {
    const { $id } = this.props;
    navigate(`/lists/${$id}/edit`);
  }

  onDeleteClick = () => {
    this.setState({ showDialog: true });
  }

  handleToggle = () => {
    this.setState(({ showDialog }) => ({ showDialog: !showDialog }));
  }

  render() {
    const { title } = this.props;
    const { showDialog } = this.state;

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

          <MenuItem
            icon="delete_outline"
            theme={s}
            caption="Delete list"
            onClick={this.onDeleteClick}
          />
        </IconMenu>

        <Dialog
          actions={this.actions}
          active={showDialog}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="Delete list"
        >
          <p>
            Do you really want to delete {title || 'the list'}?
          </p>
        </Dialog>
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
