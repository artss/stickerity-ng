import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import copy from 'copy-to-clipboard';

import styles from './PasswordItem.css';

const COPIED_TIMEOUT = 2000;

export default class PasswordItem extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  state = {
    loginCopied: false,
    passwordCopied: false,
  };

  copyLogin = () => {
    const { login } = this.props;
    copy(login);
    this.setState({ loginCopied: true });
    setTimeout(() => this.setState({ loginCopied: false }), COPIED_TIMEOUT);
  }

  copyPassword = () => {
    const { password } = this.props;
    copy(password);
    this.setState({ passwordCopied: true });
    setTimeout(() => this.setState({ passwordCopied: false }), COPIED_TIMEOUT);
  }

  resetCopied = () => {
    this.setState({
      loginCopied: false,
      passwordCopied: false,
    });
  }

  render() {
    const { title, login } = this.props;
    const { loginCopied, passwordCopied } = this.state;

    return (
      <li className={styles.root}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{login}</div>
        </div>

        <IconButton
          icon={loginCopied ? 'done' : 'person'}
          title="Copy login"
          onClick={this.copyLogin}
        />
        <IconButton
          icon={passwordCopied ? 'done' : 'file_copy'}
          title="Copy password"
          onClick={this.copyPassword}
        />

        <IconMenu className={styles.menu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit entry" />
          <MenuItem value="delete" icon="delete" caption="Delete entry" />
        </IconMenu>

        <Snackbar
          type="accept"
          action="Dismiss"
          label={`Login for ${title} is copied`}
          active={loginCopied}
          timeout={COPIED_TIMEOUT}
          onClick={this.resetCopied}
        />

        <Snackbar
          type="accept"
          action="Dismiss"
          label={`Password for ${title} is copied`}
          active={passwordCopied}
          timeout={COPIED_TIMEOUT}
          onClick={this.resetCopied}
        />
      </li>
    );
  }
}
