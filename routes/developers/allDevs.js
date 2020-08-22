const { getCollection } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  try {
    console.log('Trying to get all developers');
    const data = await getCollection('users');
    if(data) {
      console.log('Fetched developers succesfully');
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
