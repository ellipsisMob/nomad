const firebase = require('firebase');
const { createDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  const newEvent = createDocument('events', req);
  if (newEvent) {
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