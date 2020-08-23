const { db } = require('./firebaseInit');

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

module.exports = {
  getCollection,
  getDocument,
  createDocument,
  deleteDocument,
}
