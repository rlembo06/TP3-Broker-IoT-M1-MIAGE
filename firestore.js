const admin = require('firebase-admin');

const config = {
    apiKey: "AIzaSyDotoIZIX0t33vT2Tn7jrPKN4NHh1GBioc",
    authDomain: "tp3-iot-m1-miage.firebaseapp.com",
    databaseURL: "https://tp3-iot-m1-miage.firebaseio.com",
    projectId: "tp3-iot-m1-miage",
    storageBucket: "tp3-iot-m1-miage.appspot.com",
    messagingSenderId: "556238100610"
};

admin.initializeApp(config);

module.exports = admin.firestore();