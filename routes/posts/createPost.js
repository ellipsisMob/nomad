const firebase = require('firebase');
const { createDocument } = require('../../firebaseUtils');

module.exports = (req, res) => {
  // if (req.body.post) {
  //   req.body.post.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  //   // console.log('req.body from createPost', req.body.post);
  // }

  console.log('From createPost route USERNAME: ', req.user.name);
  console.log('From createPost route USE: ', req.user.authorId);
  if (req.user.name) {
    req.body.post.author = req.user.name;
  } else {
    req.body.post.author = 'Anonymous';
  }

  req.body.post.authorId = req.user.authorId;

  createDocument('posts', req)
    .then(() => {
      console.log('New post created succesfully');
      res
        .json(req.body)
        .status(201)
        .end();
    })
    .catch(err => {
      console.log('Error creating a new post', err);
      res
        .status(400)
        .end();
    })
};
