const { getCollection } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  try {
    console.log('Trying to get all events');
    const data = await getCollection('events');
    if(data) {
      console.log('Fetched events succesfully');
      res
        .json(data)
        .status(200)
        .end();
    } else {
      console.log('No such document!');
      res
        .status(404)
        .end();
    }
  } catch(err) {    
    console.log('Error getting users collection:', err);
  }
};