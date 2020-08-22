const { getData } = require('../../firebaseUtils');

module.exports = async (req, res) => {
  const data = await getData('users');
  console.log('coming from the developers');
  res
    .json(data)
    .status(200)
    .end();
};