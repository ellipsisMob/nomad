const { db } = require('./firebaseInit');
const firebase = require('firebase');
const admin = require('firebase-admin');

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

const FBAuth = (req, res, next) => {
  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.log('No token or wrong token');
    return res.status(403).json({ error: 'Unauthorized request' });
  }
  
  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      console.log('decodedToken: ', decodedToken)
      req.user = decodedToken;
      return db.collection('testusers')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
    })
    .then(data => {
      console.log('req.user before adding handle', req.user);
      req.user.handle = data.docs[0].data().handle;
      console.log('req.user after adding handle', req.user);
      return next();
    })
    .catch(err => {
      console.log('FBAuth error while verifying token: ', err);
      return res.status(403).json(err);
    })
}

module.exports = {
  getCollection,
  getDocument,
  createDocument,
  deleteDocument,
  FBAuth,
}