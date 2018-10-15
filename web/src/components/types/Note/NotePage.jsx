import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState } from 'draft-js';

import { noteType } from '../../../proptypes/note';
import { updateItem } from '../../../actions/lists';
import DebouncedInput from '../../DebouncedInput';

import s from './NotePage.css';

class NotePage extends PureComponent {
  static propTypes = {
    ...noteType,
    updateItem: PropTypes.func.isRequired,
  };

  static getTitle({ title, text }) {
    return title || text.substr(0, 16);
  }

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  onTextChange = (editorState) => {
    this.setState({ editorState });
  }

  render() {
    const {
    // $listId,
    // $id,
      title,
      // text,
    } = this.props;
    const { editorState } = this.state;

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
          <Editor editorState={editorState} onChange={this.onTextChange} />
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
