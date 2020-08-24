const { getDocument } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  // if (req.user.handle === req.params.id) {
  console.log(`Trying to get developer ${req.params.id}`);
    const data = await getDocument('testusers', req.params.id);
    // const data = await getDocument('users', req.params.id);
    if(data) {
      console.log('Fetched developers succesfully');
      console.log(data)
      res
        .json(data)
        .status(200)
        .end();
    } else {
      console.log('Something went wrong in single developer route');
      console.log(data)
      res
        .status(404)
        .end();
    }
  // } else {
  //   return res.status(404).json({ message: 'Unauthorized to access this page' })
  // }
};