const admin = require("firebase-admin");
const serviceAccount = require('../config/serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://chatapp-f7b94.appspot.com"
});

module.exports = admin;