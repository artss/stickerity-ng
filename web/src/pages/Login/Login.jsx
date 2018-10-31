import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import Sticker from '../../components/Sticker';

import s from './Login.css';

export default class Login extends PureComponent {
  state = {
    login: '',
    password: '',
  };

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { login, password } = this.state;
    const headTitle = 'Sign in';

    return (
      <Sticker className={s.root} title={headTitle}>
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <form onSubmit={this.onSubmit}>
          <Input
            name="login"
            label="Login"
            value={login}
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
            disabled={!login || !password}
            raised
            primary
          />
        </form>
      </Sticker>
    );
  }
}
