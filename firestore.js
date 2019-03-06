const admin = require("firebase-admin");
const serviceAccount = require("./serviceGoogleAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tp3-iot-m1-miage.firebaseio.com"
});

module.exports = admin.firestore();
