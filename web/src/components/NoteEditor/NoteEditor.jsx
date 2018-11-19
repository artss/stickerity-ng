import React, { Suspense, lazy } from 'react';

import s from './NoteEditor.css';

const NoteEditor = lazy(() => import(/* webpackChunkName: "note-editor" */ './NoteEditor.impl'));

function NoteEditorFallback() {
  return (
    <div className={s.root}>
      Loading...
    </div>
  );
}

export default function NoteEditorLoader(props) {
  const fallback = <NoteEditorFallback />;

  return (
    <Suspense fallback={fallback}>
      <NoteEditor {...props} />
    </Suspense>
  );
}
