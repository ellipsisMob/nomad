const firebase = require('firebase');

module.exports = (req, res) => {
  console.log('Logging developer in');

  const credentials = {
    email: req.body.email,
    password: req.body.password,
  }

  firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({ token: token, email: credentials.email }))
    .catch(err => {
      console.log(err);
      if (err.code === 'auth/wrong-password' || err.code === "auth/user-not-found") {
        return res.status(403).json({ general: 'Wrong username or password' })
      }
      return res.status(500).json({ error: err.code })
    })
};