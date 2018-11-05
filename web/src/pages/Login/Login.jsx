import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

// import { userType } from '../../proptypes/user';
import { authenticate } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './Login.css';

class Login extends PureComponent {
  static propTypes = {
    // user: PropTypes.shape(userType).isRequired,
    authenticate: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

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
    const { email, password } = this.state;
    const headTitle = 'Sign in';

    return (
      <Sticker className={s.root} title={headTitle}>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <Input
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
            icon="lock_open"
            disabled={!email || !password}
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
  return bindActionCreators({ authenticate }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
