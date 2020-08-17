const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('id', process.env.APIKEY);
  console.log('auth', process.env.AUTHDOMAIN);
  console.log('project', process.env.PROJECTID);
  res
    .json('Hello world and nodemon' )
    .status(200)
    .end();
});

app.get('/users', (req, res) => {
  console.log('getting /users');
  res
    .json('users')
    .status(200)
    .end();
})

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
