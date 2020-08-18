import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('from useEffect hook', posts);
  }, [posts]);

  const fetchPosts = () => {
    fetch('http://localhost:8000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  return (
    <div className="container">
      <h1>Recent posts</h1>
      <p>Hello from PostList</p>
      <button type="button" id="fetch" onClick={fetchPosts}>Fetch posts</button>
      {posts
        ? posts.map(post => {
          return <Post key={post.id} title={post.data.title} body={post.data.body} author={post.data.author} date={post.data.date} /> 
        })
        : <h1>loading posts...</h1>}    
    </div>
  );
};

export default PostList;
