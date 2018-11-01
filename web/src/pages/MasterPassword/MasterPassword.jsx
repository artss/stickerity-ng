import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import { setMasterPassword } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './MasterPassword.css';

class MasterPassword extends PureComponent {
  /* eslint-disable react/no-unused-prop-types */ // eslint bug
  static propTypes = {
    masterPasswordAdded: PropTypes.bool.isRequired,
    masterPasswordError: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    setMasterPassword: PropTypes.func.isRequired,
  };
  /* eslint-enable react/no-unused-prop-types */

  state = {
    password: '',
    redirected: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      masterPasswordAdded,
      masterPasswordError,
      history,
      url,
    } = nextProps;
    const { redirected } = prevState;
    if (masterPasswordAdded && !masterPasswordError && !redirected) {
      history.push(url);
      return { ...prevState, redirected: true };
    }
    return prevState;
  }

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
    const { masterPasswordError } = this.props;
    const { password } = this.state;

    return (
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
    );
  }
}

function mapStateToProps(
  { user: { masterPasswordAdded = false, masterPasswordError = false } },
  { location: { state: { from = '/' } } = { state: {} } },
) {
  return {
    masterPasswordAdded,
    masterPasswordError,
    url: from,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMasterPassword }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterPassword));
