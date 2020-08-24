const firebase = require('firebase');
const admin = require('firebase-admin');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
};

firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

module.exports.db = firebase.firestore();