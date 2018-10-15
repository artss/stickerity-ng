import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { passwordType } from '../../../proptypes/password';
import { updateItem } from '../../../actions/lists';
import CopyButton from '../../CopyButton';
import DebouncedInput from '../../DebouncedInput';

import s from './PasswordPage.css';

class PasswordPage extends PureComponent {
  static propTypes = passwordType;

  static getTitle({ title, url, login }) {
    return title || url || login;
  }

  state = {
    showPassword: false,
  };

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  togglePassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  render() {
    const {
      title,
      login,
      url,
      password,
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div className={s.root}>
        <div className={s.field}>
          <DebouncedInput
            className={s.input}
            label="Title"
            name="title"
            value={title}
            onChange={this.onInputChange}
          />
        </div>

        <div className={s.field}>
          <DebouncedInput
            className={s.input}
            label="URL"
            name="url"
            value={url}
            onChange={this.onInputChange}
          />

          <a href={url} target="_blank" rel="noopener noreferrer" className={s.button}>
            <FontIcon value="open_in_new" />
          </a>
        </div>

        <div className={s.field}>
          <DebouncedInput
            className={s.input}
            label="Login"
            name="login"
            value={login}
            onChange={this.onInputChange}
          />

          <CopyButton text={login} className={s.button}>
            <FontIcon value="file_copy" />
          </CopyButton>
        </div>

        <div className={s.field}>
          <DebouncedInput
            className={s.input}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={this.onInputChange}
          />

          <Button className={s.button} onClick={this.togglePassword}>
            <FontIcon value="remove_red_eye" />
          </Button>

          <CopyButton text={password} className={s.button}>
            <FontIcon value="file_copy" />
          </CopyButton>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPage);
