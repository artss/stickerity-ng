import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Checkbox from 'react-toolbox/lib/checkbox';

import { userType } from '../../proptypes/user';
import { register } from '../../actions/user';
import Sticker from '../../components/Sticker';
import DebouncedInput from '../../components/DebouncedInput';
import PasswordInput from '../../components/PasswordInput';

import s from './AuthPage.css';

class Register extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    register: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    agree: false,
  };

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value });
  }

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { register: reg } = this.props;
    const { name, email, password } = this.state;
    reg(name, email, password);
  }

  render() {
    const { user: { authPending, authError } } = this.props;
    const {
      name,
      email,
      password,
      agree,
    } = this.state;
    const headTitle = 'Register';

    return (
      <Sticker className={s.root} title={headTitle}>
        <Helmet>
          <script src={'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_KEY} />
          <title>{headTitle}</title>
        </Helmet>

        {authError && (
          <div className={s.error}>
            {authError}
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <Input
            name="name"
            label="Name (optional)"
            value={name}
            onChange={this.onChange}
            autoFocus
          />

          <DebouncedInput
            type="email"
            name="email"
            label="E-mail"
            value={email}
            onChange={this.onEmailChange}
          />

          <PasswordInput
            name="password"
            label="Password"
            onChange={this.onPasswordChange}
            value={password}
          />

          <div className={s.passwordAttention}>
            <b>You should remember your password</b>.
            Your data can be unencrypted with your password only,
            so if you forget it, you will lose access to your data.
            Forever.
          </div>

          <div className={s.checkboxWrap}>
            <Checkbox
              name="agree"
              label={(
                <span>I agree to the <Link to="/terms">Terms</Link></span>
              )}
              value={agree}
              checked={agree}
              onChange={this.onChange}
            />
          </div>

          <Button
            type="submit"
            label="Sign in"
            icon={authPending ? 'sync' : 'lock_open'}
            disabled={!email || !password || !agree || authPending}
            raised
            primary
          />
        </form>
      </Sticker>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ register }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
