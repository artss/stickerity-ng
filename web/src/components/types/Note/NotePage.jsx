import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { noteType } from '../../../proptypes/note';
import { updateItem, deleteItem } from '../../../actions/items';
import { navigate } from '../../../util/history';
import Sticker from '../../Sticker';
import DeleteDialogButton from '../../DeleteDialogButton';
import DebouncedInput from '../../DebouncedInput';
import NoteEditor from '../../NoteEditor';

import s from './NotePage.css';


class NotePage extends PureComponent {
  static propTypes = {
    ...noteType,
    updateItem: PropTypes.func.isRequired,
  };

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  onTextChange = (text) => {
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { text });
  }

  onDelete = () => {
    const { $listId, $id, deleteItem: del } = this.props;
    navigate(`/lists/${$listId}`, null, true);
    del($listId, $id);
  }

  render() {
    const {
      $listId,
      // $id,
      title,
      text,
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

        <DeleteDialogButton
          className={s.deleteButton}
          title={title || headTitle}
          action={this.onDelete}
        >
          <FontIcon value="delete_outline" />
        </DeleteDialogButton>

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

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem, deleteItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
