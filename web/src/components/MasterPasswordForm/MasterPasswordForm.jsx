import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import { setMasterPassword } from '../../actions/user';
import Sticker from '../Sticker';

import s from './MasterPasswordForm.css';

class MasterPasswordForm extends PureComponent {
  static propTypes = {
    masterPasswordAdded: PropTypes.bool.isRequired,
    masterPasswordError: PropTypes.bool.isRequired,
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
    const { masterPasswordAdded, masterPasswordError } = this.props;

    if (masterPasswordAdded && !masterPasswordError) {
      return null;
    }

    const { password } = this.state;

    return (
      <div className={s.overlay}>
        <Sticker
          className={s.sticker}
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
      </div>
    );
  }
}

function mapStateToProps({ user: { masterPasswordAdded = false, masterPasswordError = false } }) {
  return { masterPasswordAdded, masterPasswordError };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMasterPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPasswordForm);
