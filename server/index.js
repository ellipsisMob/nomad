const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Hello world and nodemon');
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
})

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
