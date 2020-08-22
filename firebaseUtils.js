const firebase = require('firebase');
require('dotenv').config();

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

  const documents = [];
  snapshot.forEach(doc => {
    documents.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return documents;
};

module.exports = {
  getData: getData
}