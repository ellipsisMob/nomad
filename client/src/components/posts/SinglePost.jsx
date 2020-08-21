import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router';

const SinglePost = props => {
  const { id } = useParams();
  const [rawPost, setRawPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = () => {
      setLoading(true);
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setRawPost([data]))
        .then(() => setLoading(false));
    };
    fetchPost();
  }, [id]);

  const handleDelete = id => {
    if (window.confirm('Do you really want to delete this post?')) {
      fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
        .then(res => window.location.replace('/'))
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    console.log('SinglePost page: ', rawPost);
  }, [rawPost]);

  return (
    <div>
      {!loading
        ? rawPost.map(raw => {
          const postData = raw.data.post;
          const contentState = convertFromRaw(postData);
          const editorState = EditorState.createWithContent(contentState);
          return <Editor editorState={editorState} readOnly={true} />;
        })
        : <h1>Loading ...</h1>}
    </div>
  );
};

export default SinglePost;
