import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseAuth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
// console.log(provider);

export const createUser = ({ email, password }) => {
  return new Promise((solve, reject) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((cred) => {
        // console.log("user created:", cred.user);
        solve(cred.user);
      })
      .catch((err) => {
        // console.log(err.message);
        reject(err);
      });
  });
};

export const fiebaseSignOut = () => {
  return new Promise((solve, reject) => {
    signOut(firebaseAuth)
      .then((res) => {
        // console.log("signout");
        solve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const firebaseSignIn = ({ email, password }) => {
  return new Promise((solve, reject) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        // console.log("signin", res.user);
        solve(res.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginWithGoogle = () => {
  return new Promise((solve, reject) => {
    console.log("loginWithGoogle");
    signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        // console.log(res.user);
        solve(res.user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {};
