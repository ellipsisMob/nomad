const firebase = require('firebase');
const { createDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  // if (req.body.post) {
  //   req.body.post.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  //   // console.log('req.body from createPost', req.body.post);
  // }
  const answer = createDocument('posts', req);
  if (answer) {
    res
      .json(req.body)
      .status(201)
      .end();
  } else {
    res
      .status(400)
      .end();
  }
};
