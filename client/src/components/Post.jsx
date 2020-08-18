import React from 'react';

const Post = props => {
  return (
  <div>
    <h1>{props.title}</h1>
    <p>
      {props.body}
      <span>{props.author}</span>
      <span>{props.date.seconds}</span>
    </p>
  </div>
  )
};

export default Post;
