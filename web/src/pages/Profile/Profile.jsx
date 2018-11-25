import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { saveProfile } from '../../actions/user';
import { userType } from '../../proptypes/user';

import Sticker from '../../components/Sticker';
import DebouncedInput from '../../components/DebouncedInput';
import PasswordInput from '../../components/PasswordInput';

import s from './Profile.css';

class Profile extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    saveProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { name, email } = props.user;

    this.state = {
      name,
      newEmail: email,
      password: '',
      newPassword: '',
    };
  }

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { saveProfile: save } = this.props;
    save(this.state);
  }

  render() {
    const { user: { authPending, authError } } = this.props;

    const {
      name,
      newEmail,
      password,
      newPassword,
    } = this.state;

    return (
      <Sticker
        className={s.root}
        title="Profile"
      >
        <Helmet>
          <title>Profile</title>
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
            name="newEmail"
            label="E-mail"
            value={newEmail}
            onChange={this.onChange}
          />

          <Input
            name="password"
            type="password"
            label="Current password"
            value={password}
            onChange={this.onChange}
          />

          <h3>Password change</h3>

          <div>
            <p>Leave this field blank to keep your password unchanged.</p>
            <p>
              <b>Note:</b> may take time to re-encrypt all your data with new password.
            </p>
          </div>

          <PasswordInput
            name="newPassword"
            label="New password"
            hint="Not working yet"
            onChange={this.onChange}
            value={newPassword}
          />

          <Button
            type="submit"
            label="Save"
            disabled={!password || authPending}
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
  return bindActionCreators({ saveProfile }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
