import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Link } from 'react-router-dom';
import Dialog from 'react-toolbox/lib/dialog';

import { userType } from '../../proptypes/user';
import { logout } from '../../actions/user';

import s from './Header.css';

const menuTheme = {
  menu: s.userMenuPopup,
};

class UserMenu extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    logout: PropTypes.func.isRequired,
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
        const { logout: action } = this.props;
        action();
        this.setState({ showDialog: false });
      },
    },
  ];

  logout = () => {
    this.setState({ showDialog: true });
  }

  render() {
    const { user: { id, name, email } } = this.props;
    const { showDialog } = this.state;

    if (!id) {
      return (
        <div className={s.userMenu}>
          <Link to="/register" className={s.menuLink}>Register</Link>
          <Link to="/login" className={s.menuLink}>Sign in</Link>
        </div>
      );
    }

    return (
      <div className={s.userMenu}>
        <Link to="/lists" className={s.menuLink}>My board</Link>

        <IconMenu icon="menu" className={s.userMenuButton} theme={menuTheme}>
          <MenuItem
            icon="person_outline"
            className={s.userMenuItem}
            caption={name || email}
            onClick={this.openProfile}
          />

          <MenuDivider />

          <MenuItem
            icon="power_settings_new"
            className={s.userMenuItem}
            caption="Sign out"
            onClick={this.logout}
          />
        </IconMenu>

        <Dialog
          actions={this.actions}
          active={showDialog}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="Confirm sign out"
        >
          <p>
            Do you really want to <b>sign out</b>?
          </p>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
