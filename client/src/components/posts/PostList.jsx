import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
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

  return (
    <div className="post-container">
      {!loading
        ? rawPosts.map(raw => {
          const postData = raw.data.post;
          const contentState = convertFromRaw(postData);
          const editorState = EditorState.createWithContent(contentState);
          return (
            <div key={raw.id} className="showPost">
              <Editor editorState={editorState} readOnly={true} />
              <div className="fullPost">
                <Link to={`/posts/${raw.id}`}>Full post ...</Link>
              </div>
            </div>
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
