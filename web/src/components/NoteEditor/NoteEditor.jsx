import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
  ContentState,
  EditorState,
  RichUtils,
} from 'draft-js';

import Toolbar from './Toolbar';
import s from './NoteEditor.css';

export default class NoteEditor extends PureComponent {
  static propTypes = {
    // name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(ContentState),
    ]),
  };

  static defaultProps = {
    // name: null,
    value: null,
  };

  constructor(props) {
    super(props);

    let editorState;

    if (typeof props.value === 'string') {
      editorState = EditorState.createWithContent(ContentState.createFromText(props.value));
    } else if (props.value) {
      editorState = EditorState.createWithContent(props.value);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      toolbarPosition: null,
      editorState,
    };
  }

  refEditor = (el) => {
    this.editor = el;
  }

  refToolbar = (el) => {
    this.toolbar = el;
  }

  updateToolbarPosition = () => {
    const { editorState } = this.state;

    if (editorState.getSelection().isCollapsed()) {
      this.setState({ toolbarPosition: null });
      return;
    }

    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
      this.setState({ toolbarPosition: null });
      return;
    }

    const range = selection.getRangeAt(0);

    const editorRect = this.editor.editor.getBoundingClientRect();
    const toolbarRect = this.toolbar.getRect();
    const rangeRect = range.getBoundingClientRect();

    this.setState({
      toolbarPosition: {
        left: Math.min(rangeRect.left - editorRect.left, editorRect.width - toolbarRect.width),
        top: rangeRect.top - editorRect.top,
      },
    });
  }

  onChange = (editorState) => {
    this.setState({ editorState }, this.updateToolbarPosition);
  }

  onToggle = (style) => {
    this.setState(({ editorState }) => (
      { editorState: RichUtils.toggleInlineStyle(editorState, style) }
    ));
  }

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const { editorState, toolbarPosition } = this.state;

    return (
      <div className={s.root}>
        <div className={s.editor}>
          <Editor
            ref={this.refEditor}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>

        <Toolbar
          ref={this.refToolbar}
          position={toolbarPosition}
          onToggle={this.onToggle}
        />
      </div>
    );
  }
}
