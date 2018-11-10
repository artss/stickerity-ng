import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { formatUrl } from '../../../util/format';
import { passwordType } from '../../../proptypes/password';
import Sticker from '../../Sticker';
import DeleteDialogButton from '../../DeleteDialogButton';
import CopyButton from '../../CopyButton';
import PasswordInput from '../../PasswordInput';
import DebouncedInput from '../../DebouncedInput';
import PasswordGenerationForm from './PasswordGenerationForm';

import s from './PasswordPage.css';

export default class PasswordPage extends PureComponent {
  static propTypes = {
    ...passwordType,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    showGenerationForm: false,
  };

  onInputChange = (value, e) => {
    const { name } = e.target;
    const {
      title,
      login,
      url,
      password,
      onChange,
    } = this.props;
    onChange({
      ...{
        title,
        login,
        url,
        password,
      },
      [name]: value,
    });
  };

  toggleGenerationForm = () => {
    this.setState(({ showGenerationForm }) => ({ showGenerationForm: !showGenerationForm }));
  }

  onGenerate = (password) => {
    const {
      title,
      login,
      url,
      onChange,
    } = this.props;
    onChange({
      ...{
        title,
        login,
        url,
        password,
      },
    });
    this.setState({ showGenerationForm: false });
  }

  render() {
    const {
      $listId,
      $id,
      title,
      login,
      url,
      password,
      onDelete,
    } = this.props;
    const { showGenerationForm } = this.state;

    const headTitle = title || url || login || 'Password';

    return (
      <Sticker
        className={s.root}
        backUrl={`/lists/${$listId}`}
        title={headTitle}
      >
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <DeleteDialogButton
          className={s.deleteButton}
          title={title || headTitle}
          action={onDelete}
        >
          <FontIcon value="delete_outline" />
        </DeleteDialogButton>

        <div className={s.field}>
          <DebouncedInput
            className={s.input}
            label="Title"
            name="title"
            value={title}
            onChange={this.onInputChange}
            autoFocus={!$id}
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
            href={formatUrl(url)}
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

          {login && (
            <CopyButton text={login} className={s.button}>
              <FontIcon value="file_copy" />
            </CopyButton>
          )}
        </div>

        <div className={s.field}>
          <PasswordInput
            className={s.input}
            label="Password"
            name="password"
            value={password}
            onChange={this.onInputChange}
            debounced
            checkOnMount
          />

          {password && (
            <CopyButton text={password} className={s.button}>
              <FontIcon value="file_copy" />
            </CopyButton>
          )}
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
      </Sticker>
    );
  }
}
