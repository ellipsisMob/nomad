const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = express();
const port = 8000;

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const getData = async () =>  {
  // const doc = await db.doc('users/').get()
  // const data = doc.data()
  // if (!data) {
  //   console.error('user does not exist')
  //   return
  // }
  // return data
  
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  snapshot.forEach(doc => {
    console.log('DOC DATA', doc.data());
  });
  return snapshot

}

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

app.get('/users', (req, res) => {
  console.log('getting /users');
  res
    .json('users')
    .status(200)
    .end();
});

app.get('/data', cors(), async (req, res) => {
  const data = await getData();
  // console.log('coming from the data endoint', data);
  res
    .json(data)
    .end()
});

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
