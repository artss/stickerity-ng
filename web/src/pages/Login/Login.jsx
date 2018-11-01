import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { userType } from '../../proptypes/user';
import { login } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './Login.css';

class Login extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;
    login(username, password);
  }

  render() {
    const { username, password } = this.state;
    const headTitle = 'Sign in';

    return (
      <Sticker className={s.root} title={headTitle}>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <Input
            name="username"
            label="User"
            value={username}
            onChange={this.onChange}
            autoFocus
          />

          <Input
            type="password"
            name="password"
            label="Password"
            onChange={this.onChange}
            value={password}
          />

          <Button
            type="submit"
            label="Sign in"
            icon="lock_open"
            disabled={!username || !password}
            raised
            primary
          />
        </form>
      </Sticker>
    );
  }
}

function mapStateToProps(
  { user },
  { location: { state: { from = '/' } } = { state: {} } },
) {
  return { user, url: from };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
