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

app.get('/', (req, res) => {
  console.log('id', process.env.APIKEY);
  console.log('auth', process.env.AUTHDOMAIN);
  console.log('project', process.env.PROJECTID);
  res
    .json('Hello world and nodemon')
    .status(200)
    .end();
});

app.get('/api/users', async (req, res) => {
  const data = await getData('users');
  console.log('coming from the users endoint', data);
  res
    .json(data)
    .status(200)
    .end();
});

app.get('/api/users/:id', async (req, res) => {
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

app.get('/api/posts', async (req, res) => {
  const data = await getData('posts');
  console.log('coming from the posts endpoint', data);
  res
    .json(data)
    .status(200)
    .end();
});

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
