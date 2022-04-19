const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

//auth trigger & record
exports.userSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    permissions: [],
  });
});

exports.userDelete = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);

  return doc.delete();
});
