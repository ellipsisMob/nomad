import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import { useParams } from 'react-router';
import Post from './Post';

const SinglePost = () => {
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

  return (
    <div>
      {!loading
        ? rawPost.map(raw => {
          const postData = raw.data.post;
          const contentState = convertFromRaw(postData);
          const editorState = EditorState.createWithContent(contentState);
          return <Post rawPost={raw} toRender={editorState} />;
        })
        : <h1>Loading ...</h1>}
    </div>
  );
};

export default SinglePost;
