import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js';
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

  return (
    <div className="post-container">
      {!loading
        ? rawPosts.map(raw => {
          const postData = raw.data.post;
          const contentState = convertFromRaw(postData);
          const editorState = EditorState.createWithContent(contentState);
          const newEditorState = truncate(editorState);
          return (
            <Link to={`/posts/${raw.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={raw.id}>
              <div className="showPost">
                <div className="headerImg">
                  <img src="https://picsum.photos/1200/300?grayscale&random=1" alt="headerImg" className="headerImg" />
                </div>
                <Editor editorState={newEditorState} readOnly={true} />
                {/* <div className="fullPost">
                  <Link to={`/posts/${raw.id}`}>Full post ...</Link>
                </div> */}
              </div>
            </Link>
          );
        })
        : <h1>Loading ...</h1>}
      {/* <CreatePost />
      {!loading
        ? posts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.data.title}
            body={post.data.body}
            author={post.data.author} />
            // date={post.data.date} />
        ))
        : <h1>loading posts...</h1>} */}
    </div>
  );
};

export default PostList;
