import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './Post.css';

const Post = props => {
  const {
    id,
    title,
    body,
    author,
    date,
  } = props;
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>
        {body}
        {/* FIX BREAKS WITH STYLING */}
        <br />
        <br />
        <Link key={id} to={`/posts/${id}`}>Full post...</Link>

      </p>
      <div className="bottomBar">
        <div className="author">
          {`by ${author}`}
        </div>
        <div className="timestamp">
          {`at ${date.seconds}`}
        </div>
      </div>
    </div>
  );
};

export default Post;
