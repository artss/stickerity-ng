import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userType } from '../../proptypes/user';

import s from './Header.css';

class UserMenu extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
  };

  render() {
    const { user: { id, name, email } } = this.props;

    if (id) {
      return (
        <div className={s.userMenu}>
          <Link to="/profile" className={s.link}>{name || email}</Link>
          <Link to="/logout" className={s.link}>Sign out</Link>
        </div>
      );
    }

    return (
      <div className={s.userMenu}>
        <Link to="/register" className={s.link}>Register</Link>
        <Link to="/login" className={s.link}>Sign in</Link>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(UserMenu);
