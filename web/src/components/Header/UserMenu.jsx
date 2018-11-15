import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Dialog from 'react-toolbox/lib/dialog';

import { userType } from '../../proptypes/user';
import { logout } from '../../actions/user';

import s from './Header.css';

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
          <Link to="/register" className={s.link}>Register</Link>
          <Link to="/login" className={s.link}>Sign in</Link>
        </div>
      );
    }

    return (
      <div className={s.userMenu}>
        <Link to="/lists" className={s.link}>My board</Link>
        <Link to="/profile" className={s.link}>{name || email}</Link>
        <button type="button" onClick={this.logout} className={s.link}>Sign out</button>

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
