import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Post from './Post';
import CreatePost from './CreatePost';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPosts, setNewPosts] = useState({});

  // useEffect to fetch new style posts
  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      fetch('api/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        .then(() => setLoading(false));
    };
    fetchPosts();
  }, []);

  // useEffect the original one
  // useEffect(() => {
  //   const fetchPosts = () => {
  //     setLoading(true);
  //     fetch('/api/posts')
  //       .then(res => res.json())
  //       .then(data => setPosts(data))
  //       .then(() => setLoading(false));
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    console.log('from useEffect hook', posts);
    if (posts[1]) {
      console.log('accesing posts ', posts[1].data.post);
      const rawPost = posts[1].data.post;
      setNewPosts(rawPost);
      console.log('state posts ', newPosts);
    }
  }, [posts]);

  // const editorState = EditorState.createWithContent(newPosts);

  return (
    <div className="container">
      {/* <Editor editorState={editorState} readOnly={true} /> */}
      {/* <CreatePost />
      {!loading
        ? posts.map(post => (
          <Post
            key={post.id}
            title={post.data.title}
            body={post.data.body}
            author={post.data.author}
            date={post.data.date} />
        ))
        : <h1>loading posts...</h1>} */}
    </div>
  );
};

export default PostList;
