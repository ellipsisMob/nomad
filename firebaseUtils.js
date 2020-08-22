const firebase = require('firebase');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const getCollection = async col => {
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

// DEV PAGES NEEDS TO BE MODIFIED. OBJECT NOW HAS ID AND DATA IN RESPONSE.
const getDocument = async (col, id) => {
  const docRef = db.collection(col).doc(id);
  const doc = await docRef.get();
  if (doc.empty) {
    console.log('No matching documents.');
    return;
  }
  return {
    id: doc.id,
    data: doc.data(),
  }
}

module.exports = {
  getCollection: getCollection,
  getDocument: getDocument,
}
