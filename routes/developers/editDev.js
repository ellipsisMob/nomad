const { editDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  try {
    await editDocument('testusers', req.body.id, req.body);
    res
      .status(200)
      .end();
  } catch(err) {
    res
      .status(400)
      .end();
  }
};