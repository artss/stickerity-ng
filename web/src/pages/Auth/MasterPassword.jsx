import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import { userType } from '../../proptypes/user';
import { setMasterPassword } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './AuthPage.css';

class MasterPassword extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    setMasterPassword: PropTypes.func.isRequired,
  };

  state = {
    password: '',
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { setMasterPassword: set } = this.props;
    const { password } = this.state;
    set(password);
  }

  render() {
    const { user: { masterPasswordError } } = this.props;
    const { password } = this.state;

    return (
      <Sticker
        className={s.root}
        title="Type your master password"
      >
        {masterPasswordError && (
          <div className={s.error}>
            Looks like you entered the wrong password. Check if <b>Caps Lock</b> is pressed.
          </div>
        )}

        <form onSubmit={this.onSubmit}>
          <Input
            label="Master password"
            type="password"
            value={password}
            onChange={this.onPasswordChange}
            autoFocus
          />

          <Button
            type="submit"
            label="Decrypt"
            icon="lock_open"
            disabled={!password}
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
  return bindActionCreators({ setMasterPassword }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterPassword));
