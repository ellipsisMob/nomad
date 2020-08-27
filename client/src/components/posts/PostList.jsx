import React, { useState, useEffect } from 'react';
import {
  EditorState,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import './PostList.css';
import { Link } from 'react-router-dom';
import Post from './Post';

// show 200 character preview of posts
// courtesy of inrvingv8 https://github.com/facebook/draft-js/issues/742#issuecomment-388127982
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

const PostList = () => {
  const [rawPosts, setRawPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {!loading
        ? rawPosts.map(raw => {
          const { id } = raw;
          const editorState = EditorState.createWithContent(convertFromRaw(raw.data.post));
          const truncatedPost = truncate(editorState);
          return (
            <div className="frontPagePost" key={id}>
              <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Post rawPost={raw} toRender={truncatedPost} />
              </Link>
            </div>
          );
        })
        : <h1>Loading ...</h1>}
    </>
  );
};

export default PostList;
