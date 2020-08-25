import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './PostList.css';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [rawPosts, setRawPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect to fetch new style posts
  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      fetch('api/posts')
        .then(res => res.json())
        .then(data => setRawPosts(data))
        .then(() => setLoading(false));
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('from useEffect hook', rawPosts);
  }, [rawPosts]);

  // const editorState = EditorState.createWithContent(newPosts);

  const truncate = (editorState, charCount = 200) => {
    const contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();

    let index = 0;
    let currentLength = 0;
    let isTruncated = false;
    const truncatedBlocks = [];

    while (!isTruncated && blocks[index]) {
      const block = blocks[index];
      const length = block.getLength();
      if (currentLength + length > charCount) {
        isTruncated = true;
        const truncatedText = block
          .getText()
          .slice(0, charCount - currentLength);
        const state = ContentState.createFromText(`${truncatedText}...`);
        truncatedBlocks.push(state.getFirstBlock());
      } else {
        truncatedBlocks.push(block);
      }
      currentLength += length + 1;
      index++;
    }

    if (isTruncated) {
      const state = ContentState.createFromBlockArray(truncatedBlocks);
      return EditorState.createWithContent(state);
    }

    return editorState;
  };

  const showDate = d => d;

  return (
    <div className="post-container">
      {!loading
        ? rawPosts.map(raw => {
          const postData = raw.data.post;
          const { author } = raw.data.post;
          const { headerImg } = raw.data.post;
          const { createdAt } = raw.data.post;
          const { title } = raw.data.post;
          const contentState = convertFromRaw(postData);
          const editorState = EditorState.createWithContent(contentState);
          const newEditorState = truncate(editorState);
          return (
            <div className="showPost" key={raw.id}>
              <div className="headerImg">
                <img src={headerImg} alt="headerImg" className="headerImg" />
              </div>
              <Link to={`/posts/${raw.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="postPreview">
                  <h1>{title}</h1>
                  <Editor editorState={newEditorState} readOnly={true} />
                </div>
              </Link>

              <div className="postBar">
                {/* <AccountCircleIcon fontSize="large" /> */}
                By&nbsp;
                <Link to="/devs/cyBTQH78K0IR2eq1k405" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="author">
                    {author}
                  </div>
                </Link>
                &nbsp;
                at&nbsp;
                {showDate(createdAt)}
              </div>
            </div>
          );
        })
        : <h1>Loading ...</h1>}
    </div>
  );
};

export default PostList;
