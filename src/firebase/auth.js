import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseAuth = getAuth();

export const createUser = ({ email, password }) => {
  return new Promise((solve, reject) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((cred) => {
        console.log("user created:", cred.user);
        solve(cred.user);
      })
      .catch((err) => {
        console.log(err.message);
        reject(err);
      });
  });
};

export default {};
