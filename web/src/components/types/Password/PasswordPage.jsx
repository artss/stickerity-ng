import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { passwordType } from '../../../proptypes/password';
import { updateItem } from '../../../actions/items';
import CopyButton from '../../CopyButton';
import DebouncedInput from '../../DebouncedInput';
import PasswordGenerationForm from './PasswordGenerationForm';

import s from './PasswordPage.css';

class PasswordPage extends PureComponent {
  static propTypes = {
    ...passwordType,
    updateItem: PropTypes.func.isRequired,
  };

  static getTitle({ title, url, login }) {
    return title || url || login;
  }

  state = {
    showPassword: false,
    showGenerationForm: false,
  };

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  togglePassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  toggleGenerationForm = () => {
    this.setState(({ showGenerationForm }) => ({ showGenerationForm: !showGenerationForm }));
  }

  onGenerate = (password) => {
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { password });
    this.setState({ showGenerationForm: false });
  }

  render() {
    const {
      title,
      login,
      url,
      password,
    } = this.props;
    const { showPassword, showGenerationForm } = this.state;

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

          <IconButton
            className={s.button}
            icon="open_in_new"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          />
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

          <IconButton className={s.button} icon="remove_red_eye" onClick={this.togglePassword} />

          <CopyButton text={password} className={s.button}>
            <FontIcon value="file_copy" />
          </CopyButton>
        </div>

        {showGenerationForm
          ? (
            <PasswordGenerationForm
              onAccept={this.onGenerate}
              onCancel={this.toggleGenerationForm}
            />
          )
          : (
            <Button onClick={this.toggleGenerationForm} raised primary>
              Generate password
            </Button>
          )
        }
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
