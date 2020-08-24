const { deleteDocument } = require('../../firebaseUtils');

// ID OF THE TO BE DELETED POST TO BE PASSED IN REQ BODY.
// example request: http://localhost:8000/api/posts/KKuWJo5MSynJ8Ryln6FT
// Example delete body:
// {
//   "id":"KKuWJo5MSynJ8Ryln6FT"
// }

module.exports = async (req, res) => {
  try {
    await deleteDocument('testusers', req.body.id);
    res
      .status(204)
      .end();
  } catch(err) {
    res
      .status(400)
      .end();
  }
};