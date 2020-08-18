import React from 'react';

const PostList = () => {
  const fetchPosts = () => {
    fetch('http://localhost:8000/api/posts')
      .then(res => res.json())
      .then(data => console.log('fetched posts', data));
  };

  return (
    <div className="container">
      <h1>Recent posts</h1>
      <p>Hello from PostList</p>
      <button type="button" id="fetch" onClick={fetchPosts}>Fetch posts</button>
    </div>
  );
};

export default PostList;
