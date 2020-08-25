import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { Editor } from 'draft-js';
import moment from 'moment';

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
  } = postData;

  return (
    <div className="post" key={id}>
      <div className="headerImg">
        <img src={headerImg} alt="headerImg" className="headerImg" />
      </div>
      <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="postPreview">
          <h2>{title}</h2>
          <Editor editorState={toRender} readOnly />
        </div>
      </Link>
      <div className="postBar">
        By&nbsp;
        <Link to="/devs/cyBTQH78K0IR2eq1k405" style={{ textDecoration: 'none', color: 'inherit' }}>
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
