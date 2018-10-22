import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { noteType } from '../../../proptypes/note';
import Sticker from '../../Sticker';
import DeleteDialogButton from '../../DeleteDialogButton';
import DebouncedInput from '../../DebouncedInput';
import NoteEditor from '../../NoteEditor';

import s from './NotePage.css';

export default class NotePage extends PureComponent {
  static propTypes = {
    ...noteType,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  onChange(item) {
    // TODO: chect title and text
    const { onChange } = this.props;
    onChange(item);
  }

  onInputChange = (value, e) => {
    const { name } = e.target;
    this.onChange({ [name]: value });
  };

  onTextChange = (text) => {
    this.onChange({ text });
  }

  render() {
    const {
      $listId,
      $id,
      title,
      text,
      onDelete,
    } = this.props;

    const headTitle = title || 'Note';

    return (
      <Sticker
        className={s.root}
        backUrl={`/lists/${$listId}`}
        title={headTitle}
      >
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        {$id && (
          <DeleteDialogButton
            className={s.deleteButton}
            title={title || headTitle}
            action={onDelete}
          >
            <FontIcon value="delete_outline" />
          </DeleteDialogButton>
        )}

        <DebouncedInput
          className={s.input}
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
        />

        <div className={s.text}>
          <NoteEditor
            value={text}
            onChange={this.onTextChange}
          />
        </div>


      </Sticker>
    );
  }
}
