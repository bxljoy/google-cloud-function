const admin = require("firebase-admin");

let firebaseApp;

function getFirebaseAdmin() {
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp();
  }
  return admin;
}

module.exports = getFirebaseAdmin;
