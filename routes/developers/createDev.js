const firebase = require('firebase');
const { db } = require('../../firebaseInit');
const uniqid = require('uniqid');

module.exports = (req, res) => {

  const newDev = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  let token, userId;

  db.collection('testusers').doc(newDev.handle).get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'Handle already taken.'})
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newDev.email, newDev.password);
      }
    })
    .then(res => {
      userId = res.user.uid;
      return res.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      let credentials = {
        email: newDev.email,
        createdAt: new Date().toISOString(),
        userId,
      }
      return db.collection('testusers').doc().set(credentials);
    })
    .then(() => res.status(201).json({ token }))  
    .catch(err => {
      console.log(err);
      if (err.code === 'auth/email-already-in-use') {
        res.status(400).json({ email: 'Email is already taken.'})
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};