const admin = require('firebase-admin')
const propertiesData = require('./properties.json')
const serviceAccount = require('./homepointr-8cf6b-firebase-adminsdk-z286z-3934997e57.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://homepointr-8cf6b.firebaseio.com'
});

// Setup the Database with the seed data, transformed from an array to an object of objects with
// Firebase's unique keys.
const db = admin.database();
const rootRef = db.ref('/');
const propertiesRef = db.ref('/properties');

const seedDatabase = async () => {
  try {
    await propertiesRef.set(null);
    await Promise.all(
      propertiesData.map(async property => propertiesRef.push(property))
    );
    const snap = await propertiesRef.once('value');
    console.log(snap.val());
  } catch (error) {
    console.error(`Error setting up Firebase with fake data: ${error.message}`);
  }
};

seedDatabase();

