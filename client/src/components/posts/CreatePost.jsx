import React from 'react';

const CreatePost = props => {
  // a 'snackbar' success/fail message from material UI would be nice.
  const savePost = data => {
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        console.log('Success:', res);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Timestamp doesn't yet match the one in firebase. Could just go with this format instead of FB's one.
  const handleSubmit = e => {
    const { title, author, body } = e.target;
    e.preventDefault();
    const newPost = {
      title: title.value,
      author: author.value,
      body: body.value,
      date: new Date(),
    };
    console.log(newPost);
    savePost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" />
      <input type="text" name="author" />
      <input type="text" name="body" />
      <input type="submit" />
    </form>
  );
};

export default CreatePost;
