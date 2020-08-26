import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { Editor } from 'draft-js';
import moment from 'moment';

// pass Post component two props: 'rawPost' and 'toRender={editorState}'
const Post = props => {
  const showDate = d => moment(d).utc().format('DD MMM');
  const {
    rawPost,
    toRender,
  } = props;
  const { id } = rawPost;

  const postData = rawPost.data.post;
  const {
    author,
    headerImg,
    createdAt,
    title,
    authorId,
  } = postData;

  return (
    <div className="post" key={id}>
      <div className="headerImg">
        <img src={headerImg} alt="headerImg" className="headerImg" />
      </div>
      <div className="postPreview">
        <h2>{title}</h2>
        <Editor editorState={toRender} readOnly />
      </div>
      <div className="postBar">
        By&nbsp;
        <Link to={`/devs/${authorId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="author">
            {author}
          </div>
        </Link>
        ,&nbsp;
        {showDate(createdAt)}
      </div>
    </div>
  );
};

export default Post;
