const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Hello world');
  res
    .json('Hello world')
    .status(200)
    .end();
});

app.listen(port, () => console.log(`Testimonials API listening at http://localhost:${port}`));
