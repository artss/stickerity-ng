/* eslint-disable react/sort-comp */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Editor,
  ContentState,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import debounce from 'debounce';

import Toolbar from './Toolbar';
import s from './NoteEditor.css';

export default class NoteEditor extends PureComponent {
  static propTypes = {
    // name: PropTypes.string,
    // TODO: value type
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    focus: PropTypes.bool,
  };

  static defaultProps = {
    // name: null,
    value: null,
    placeholder: '',
    onChange: null,
    focus: false,
  };

  constructor(props) {
    super(props);

    let editorState;

    if (typeof props.value === 'string') {
      editorState = EditorState.createWithContent(ContentState.createFromText(props.value));
    } else if (props.value) {
      editorState = EditorState.createWithContent(convertFromRaw(props.value));
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      toolbarPosition: null,
      editorState,
      prevContent: null,
    };
  }

  componentDidMount() {
    const { focus } = this.props;

    if (focus) {
      this.editor.focus();
    }
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
  };

  debouncedOnChange = debounce((editorState) => {
    const { onChange } = this.props;
    if (onChange) {
      const content = editorState.getCurrentContent();
      const { prevContent } = this.state;
      if (content === prevContent) {
        return;
      }
      this.setState({ prevContent: content });
      onChange(convertToRaw(content));
    }
  }, 400);

  onChange = (editorState) => {
    this.setState({ editorState }, this.updateToolbarPosition);
    this.debouncedOnChange(editorState);
  };

  onToggle = (style) => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  refEditor = (el) => {
    this.editor = el;
  };

  refToolbar = (el) => {
    this.toolbar = el;
  };

  render() {
    const { placeholder } = this.props;
    const { editorState, toolbarPosition } = this.state;

    return (
      <div className={s.root}>
        <div className={s.editor}>
          <Editor
            ref={this.refEditor}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            placeholder={placeholder}
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
