import React from 'react';
import './Post.css';

const Post = props => {
  const {
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
