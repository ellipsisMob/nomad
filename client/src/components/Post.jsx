import React from 'react';

const Post = props => {
  const {
    title,
    body,
    author,
    date,
  } = props;
  return (
    <div>
      <h1>{title}</h1>
      <p>
        {body}
        <span>{author}</span>
        <span>{date.seconds}</span>
      </p>
    </div>
  );
};

export default Post;
