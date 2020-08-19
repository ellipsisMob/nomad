const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const getData = async col => {
  const usersRef = db.collection(col);
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  // TypeError: Converting circular structure to JSON fix
  const documents = [];
  snapshot.forEach(doc => {
    documents.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return documents;
};

app.use(cors());
app.use(bodyParser.json());

// ===================================================
// TESTING ROUTE
// ===================================================
app.get('/', (req, res) => {
  res
    .json('Hello world and nodemon')
    .status(200)
    .end();
});

// ===================================================
// DEVELOPER ROUTES
// ===================================================
app.get('/api/devs', async (req, res) => {
  const data = await getData('users');
  console.log('coming from the users endoint', data);
  res
    .json(data)
    .status(200)
    .end();
});

app.get('/api/devs/:id', async (req, res) => {
  console.log('Request params id: ', req.params.id)
  const docRef = db.collection("users").doc(req.params.id);

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          res
          .json(doc.data())
          .status(200)
          .end();      
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          res
          .status(404)
          .end();
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
});

// ===================================================
// POST ROUTES
// ===================================================
// http://localhost:8000/api/posts
app.get('/api/posts', async (req, res) => {
  const data = await getData('posts');
  console.log('coming from the posts endpoint', data);
  res
    .json(data)
    .status(200)
    .end();
});

// example request: http://localhost:8000/api/posts/0fk48DJ9jic4OWCvUi22
app.get('/api/posts/:id', async (req, res) => {
  const docRef = db.collection("posts").doc(req.params.id);
  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          res
          .json(doc.data())
          .status(200)
          .end();
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          res
          .status(404)
          .end();
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
});

// example request: http://localhost:8000/api/posts/
// In the body add required properties for post
app.post('/api/posts', async (req, res) => {
  db.collection("posts").add(req.body)
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    res
    .json(req.body)
    .status(201)
    .end();
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
    res
    .status(400)
    .end();
  });
});

// ID OF THE TO BE DELETED POST TO BE PASSED IN REQ BODY.
// example request: http://localhost:8000/api/posts
// Example delete body:
// {
//   "id":"KKuWJo5MSynJ8Ryln6FT"
// }
app.delete('/api/posts', async (req, res) => {
  db.collection("posts").doc(req.body.id).delete().then(function() {
      console.log("Document successfully deleted!");
      res
      .status(204)
      .end();
  }).catch(function(error) {
      console.error("Error removing document: ", error);
      res
      .status(400)
      .end();
  });
});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
