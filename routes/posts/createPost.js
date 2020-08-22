const { createDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  const answer = createDocument('posts', req);
  if(answer) {
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
