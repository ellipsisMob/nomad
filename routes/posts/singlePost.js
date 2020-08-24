const { getDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  console.log(`Trying to get post ${req.params.id}`);
    const data = await getDocument('posts', req.params.id);
    if(data) {
      console.log('Fetched posts succesfully');
      console.log(data)
      res
        .json(data)
        .status(200)
        .end();
    } else {
      console.log('Something went wrong in single post route');
      console.log(data)
      res
        .status(404)
        .end();
    }
};