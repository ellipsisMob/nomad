import React, { useState, useEffect } from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
  ContentState,
} from 'draft-js';
import './PostList.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

  const showDate = d => moment(d).utc().format('DD MMM');

  return (
    <div className="post-container">
      {!loading
        ? rawPosts.map(raw => {
          const { post } = raw.data;
          const {
            author,
            headerImg,
            createdAt,
            title,
          } = post;
          const contentState = convertFromRaw(post);
          const editorState = EditorState.createWithContent(contentState);
          const newEditorState = truncate(editorState);
          return (
            <div className="showPost" key={raw.id}>
              <div className="headerImg">
                <img src={headerImg} alt="headerImg" className="headerImg" />
              </div>
              <Link to={`/posts/${raw.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="postPreview">
                  <h2>{title}</h2>
                  <Editor editorState={newEditorState} readOnly />
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
