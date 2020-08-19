import React, { useState, useEffect } from 'react';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = () => {
      setLoading(true);
      fetch('/api/posts')
        .then(res => res.json())
        .then(data => setPosts(data))
        .then(() => setLoading(false));
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('from useEffect hook', posts);
  }, [posts]);

  return (
    <div className="container">
      <h1>Recent posts</h1>
      {!loading
        ? posts.map(post => (
          <Post
            key={post.id}
            title={post.data.title}
            body={post.data.body}
            author={post.data.author}
            date={post.data.date} />
        ))
        : <h1>loading posts...</h1>}
    </div>
  );
};

export default PostList;