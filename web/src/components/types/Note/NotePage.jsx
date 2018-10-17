import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { noteType } from '../../../proptypes/note';
import { updateItem } from '../../../actions/lists';
import DebouncedInput from '../../DebouncedInput';
import NoteEditor from '../../NoteEditor';

import s from './NotePage.css';

class NotePage extends PureComponent {
  static propTypes = {
    ...noteType,
    updateItem: PropTypes.func.isRequired,
  };

  static getTitle({ title, text }) {
    return title || text.substr(0, 16);
  }

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  render() {
    const {
    // $listId,
    // $id,
      title,
      text,
    } = this.props;

    return (
      <div className={s.root}>
        <DebouncedInput
          className={s.input}
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
        />

        <div className={s.text}>
          <NoteEditor showButtons value={text} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NotePage);
