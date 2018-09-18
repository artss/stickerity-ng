import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-toolbox/lib/button';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import copy from 'copy-to-clipboard';

import styles from './PasswordItem.css';

export default class PasswordItem extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  };

  copyLogin = () => {
    const { login } = this.props;
    copy(login);
  }

  copyPassword = () => {
    const { password } = this.props;
    copy(password);
  }

  render() {
    const { title, login } = this.props;

    return (
      <li className={styles.root}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{login}</div>
        </div>

        <IconButton icon="person" title="Copy login" onClick={this.copyLogin} />
        <IconButton icon="file_copy" title="Copy password" onClick={this.copyPassword} />

        <IconMenu className={styles.menu} icon="more_vert" menuRipple>
          <MenuItem value="edit" icon="edit" caption="Edit entry" />
          <MenuItem value="delete" icon="delete" caption="Delete entry" />
        </IconMenu>
      </li>
    );
  }
}
