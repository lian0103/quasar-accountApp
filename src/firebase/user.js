import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { useUserStore } from 'src/stores';
import { db } from './index';

export const getUserData = async () => {
  return new Promise((resolv, reject) => {
    const UserStore = useUserStore();
    let arr = [];
    onSnapshot(collection(db, 'users'), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          uid: doc.id,
        };
      });
      // console.log(arr);
      UserStore.setUserlist(arr);
      resolv(true);
    });
  });
};

export const setUserInfo = (params) => {
  params = {
    ...params,
    created: serverTimestamp(),
  };
  // console.log(params);
  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'users', params.docId);
    delete params['docId'];
    await setDoc(docRef, params);
    resolv(true);
  });
};

export const updateUserInfo = (params) => {
  params = {
    ...params,
    updated: serverTimestamp(),
  };

  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'users', params.uid);
    delete params['uid'];
    await updateDoc(docRef, params);
    resolv(true);
  });
};

export const deleteUser = (params) => {
  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'users', params.uid);
    await deleteDoc(docRef, params);
    resolv(true);
  });
};
