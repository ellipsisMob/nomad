import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  return <Editor editorState={editorState} onChange={setEditorState} />;
};

// ReactDOM.render(<MyEditor />, document.getElementById('container'));

export default MyEditor;
