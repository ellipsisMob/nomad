import React from 'react';
import Draft from 'draft-js';
import StyleButton from './StyleButton';
import SubmitButton from './Buttons';
import '../../../node_modules/draft-js/dist/Draft.css';
import './Editor.css';

const {
  Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw,
} = Draft;

const addPost = (post, token) => {
  console.log('from post method ', post);
  console.log('from addpost token ', token);
  fetch('api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({post})
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorState: EditorState.createEmpty(),
      author: '',
      headerImg: 'https://picsum.photos/1000/300?grayscale&random=2',
      title: '',
    };


    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  onChange = editorState => {
    // console.log('log author from state:', this.state.author);
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({ editorState });
  }

  authorChange = e => {
    this.setState({ [e.target.name]: e.target.value});
    // console.log('log author from state:', this.state.author);
    // this.setState({ author });
  }

  headerImgChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  }

  titleChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const contentState = this.state.editorState;
    const currentState = contentState.getCurrentContent();
    console.log('to submit ', convertToRaw(currentState));
    let post = convertToRaw(currentState);
    post.author = this.state.author;
    post.createdAt = new Date().toISOString();
    post.headerImg = this.state.headerImg;
    post.title = this.state.title;
    console.log('post', post);
    addPost(post, this.props.token);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    const pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i);

    const inputField = convertToRaw(contentState).blocks[0].text
    const { author } = this.state;
    const { headerImg } = this.state;
    const { title } = this.state;
    const isEnabled = title.length > 0 && inputField.length > 0 && pattern.test(headerImg);
    return (
      <div className="text-editor">
        <form>
          <div className="editor">
            <div className="title">
              <label htmlFor="title">
                <input 
                  name="title"
                  type="text"
                  placeholder="Title.."
                  value={title}
                  onChange={this.titleChange} />
              </label>
            </div>
          <div className="RichEditor-root">
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.mapKeyToEditorCommand}
                onChange={this.onChange}
                placeholder="Add your story..."
                ref="editor"
                spellCheck={true}
              />
            </div>
          </div>
          <div className="headerImg">
            <label htmlFor="headerImg">
              <input 
                name="headerImg"
                type="text"
                placeholder="Add link to a cover image"
                value={headerImg}
                onChange={this.headerImgChange} />
            </label>
          </div>
          </div>
        </form>
        <SubmitButton onClickFn={this.handleSubmit} disabled={!isEnabled}/>
      </div>
    );
  }
  }

  // Custom overrides for "code" style.
  const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  };

  function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
  }

  const BLOCK_TYPES = [
  // {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
  ];

  const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
  };

  var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
  ];

  const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

export default MyEditor;
