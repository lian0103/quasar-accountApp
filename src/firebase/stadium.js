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
} from "firebase/firestore";
import { useStadiumStore } from "src/stores";
import { db } from "./index";

export const getStadiumData = async () => {
  return new Promise((resolv, reject) => {
    const StadiumStore = useStadiumStore();
    let arr = [];
    onSnapshot(collection(db, "stadiums"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      console.log(arr);
      StadiumStore.setStadiumlist(arr);
      resolv(true);
    });
  });
};

export const postStadium = (params) => {
  return new Promise(async (resolv, reject) => {
    let data = {
      ...params,
      created: serverTimestamp(),
    };
    const serviceRef = doc(collection(db, "stadiums"));
    await setDoc(serviceRef, data);
    resolv(true);
  });
};

export const updateStadiumInfo = (params) => {
  params = {
    ...params,
    updated: serverTimestamp(),
  };

  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, "stadiums", params.id);
    delete params["id"];
    await updateDoc(docRef, params);
    resolv(true);
  });
};

export const deleteStadium = (params) => {
  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'stadiums', params.id);
    await deleteDoc(docRef, params);
    resolv(true);
  });
};

