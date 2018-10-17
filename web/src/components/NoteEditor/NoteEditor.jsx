import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'react-toolbox/lib/button';
import {
  Editor,
  ContentState,
  EditorState,
  RichUtils,
} from 'draft-js';

import s from './NoteEditor.css';

const TOGGLES = [
  { icon: 'format_bold', style: 'BOLD' },
  { icon: 'format_italic', style: 'ITALIC' },
  { icon: 'format_underline', style: 'UNDERLINE' },
  // { icon: 'format_clear', style: 'CLEAR' },
];

export default class NoteEditor extends PureComponent {
  static propTypes = {
    showButtons: PropTypes.bool,
    // name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(ContentState),
    ]),
  };

  static defaultProps = {
    showButtons: false,
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
      editorState,
    };

    this.toggles = TOGGLES.reduce(
      (toggles, { style }) => ({
        ...toggles,
        [style]: () => {
          this.setState(({ editorState: state }) => ({
            editorState: RichUtils.toggleInlineStyle(state, style),
          }));
          // this.editor.focus();
        },
      }),
      {}
    );
  }

  refEditor = (el) => {
    this.editor = el;
  }

  onStateChange = (editorState) => {
    this.setState({ editorState });
  }

  render() {
    const { showButtons } = this.props;
    const { editorState } = this.state;

    return (
      <div className={s.root}>
        {showButtons && (
          <div className={s.buttons}>
            {TOGGLES.map(({ icon, style }) => (
              <IconButton
                key={style}
                className={s.button}
                icon={icon}
                ripple
                onClick={this.toggles[style]}
              />
            ))}
          </div>
        )}

        <div className={s.editor}>
          <Editor
            editorState={editorState}
            onChange={this.onStateChange}
            ref={this.refEditor}
          />
        </div>
      </div>
    );
  }
}
