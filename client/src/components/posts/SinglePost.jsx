import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router';

const SinglePost = props => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = () => {
      setLoading(true);
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setPost({
            id: data.id,
            title: data.data.title,
            body: data.data.body,
            author: data.data.author,
            // date: data.data.date,
          })
        })
        .then(() => setLoading(false));
    };
    fetchPost();
  }, [id]);

  const handleDelete = id => {
    if(window.confirm('Do you really want to delete this post?')) {
      fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      .then(res => window.location.replace("/"))
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    console.log('SinglePost page: ', post);
  }, [post]);

  return (
    <div>

      {!loading
        ? (
          <div>
            <h1>
              {post.title}
            </h1>
            <p>
              {post.body}
              {post.date}
              {post.author}
            </p>
          </div>
        )
        : <h1>loading posts...</h1>}
        <Button
          onClick={() => handleDelete(post.id)}
          color="secondary" variant="outlined"
          startIcon={<DeleteIcon />}>
          Delete SHOWCASE
        </Button>
    </div>
  );
};

export default SinglePost;
