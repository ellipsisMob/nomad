const { createDev } = require('../../firebaseUtils');

module.exports = (req, res) => {

  const newDev = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  createDev(res, newDev);

};