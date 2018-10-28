import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

import { setMasterPassword } from '../../actions/user';
import Sticker from '../../components/Sticker';

class MasterPasswordForm extends PureComponent {
  static propTypes = {
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
    const { password } = this.state;

    return (
      <Sticker>
        <h1>Type your master password</h1>

        <form onSubmit={this.onSubmit}>
          <Input
            label="Master password"
            type="password"
            value={password}
            onChange={this.onPasswordChange}
          />

          <Button
            type="submit"
            label="Go"
            icon="done"
            disabled={!password}
            raised
            primary
            autoFocus
          />
        </form>
      </Sticker>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setMasterPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPasswordForm);
