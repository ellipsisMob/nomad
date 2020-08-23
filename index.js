const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(port, () => console.log(`Nomad Server listening at http://localhost:${port}`));
