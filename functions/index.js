const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

//auth trigger & record
// exports.userSignup = functions.auth.user().onCreate((user) => {
//   return admin.firestore().collection('users').doc(user.uid).set({
//     email: user.email,
//     permissions: [],
//   });
// });
