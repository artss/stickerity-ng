import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { userType } from '../../proptypes/user';
import { authenticate } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './AuthPage.css';

class Login extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    url: PropTypes.string.isRequired,
    authenticate: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    redirected: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      user: { id },
      history,
      url,
    } = nextProps;
    const { redirected } = prevState;
    if (id && !redirected) {
      history.replace(url);
      return { ...prevState, redirected: true };
    }
    return prevState;
  }

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { authenticate: auth } = this.props;
    const { email, password } = this.state;
    auth(email, password);
  }

  render() {
    const { user: { authPending, authError } } = this.props;
    const { email, password } = this.state;
    const headTitle = 'Sign in';

    return (
      <Sticker className={s.root} title={headTitle}>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        {authError && (
          <div className={s.error}>
            {authError}
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <Input
            type="email"
            name="email"
            label="E-mail"
            value={email}
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
            icon={authPending ? 'sync' : 'lock_open'}
            disabled={!email || !password || authPending}
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
  { location: { state: { from = { pathname: '/' } } } = { state: {} } },
) {
  return { user, url: from.pathname };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticate }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
