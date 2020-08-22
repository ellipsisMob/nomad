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
};

const createDocument = async (col, req) => {
  db.collection(col).add(req.body)
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
      return true;
    })
    .catch(error => {
      console.error('Error adding document: ', error);
      return false;
    });
};

const deleteDocument = async (col, id) => {
  try {
    await db.collection(col).doc(id).delete();
  } catch(err) {
    throw new Error('Delete failed', err);
  }
};

const createDev = (res, newDev) => {

  let token, userId;  

  db.collection('testusers').doc(newDev.handle).get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({ handle: 'Handle already taken.'})
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newDev.email, newDev.password);
      }
    })
    .then(res => {
      userId = res.user.uid;
      return res.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      let credentials = {
        handle: newDev.handle,
        email: newDev.email,
        createdAt: new Date().toISOString(),
        userId,
      }
      return db.collection('testusers').doc(newDev.handle).set(credentials);
    })
    .then(() => res.status(201).json({ token }))
    .catch(err => {
      console.log(err);
      if (err.code === 'auth/email-already-in-use') {
        res.status(400).json({ email: 'Email is already taken.'})
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
}

module.exports = {
  getCollection,
  getDocument,
  createDocument,
  deleteDocument,
  createDev,
}
