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
import { useServiceStore } from "src/stores";
import { db } from "./index";

export const getServiceData = async () => {
  return new Promise((resolv, reject) => {
    const ServiceStore = useServiceStore();
    let arr = [];
    onSnapshot(collection(db, "services"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      // console.log(arr);
      ServiceStore.setServicelist(arr);
      resolv(true);
    });
  });
};

export const postService = (params) => {
  return new Promise(async (resolv, reject) => {
    let data = {
      ...params,
      created: serverTimestamp(),
    };
    const serviceRef = doc(collection(db, "services"));
    await setDoc(serviceRef, data);
    resolv(true);
  });
};


export const updateServiceInfo = (params) => {
  params = {
    ...params,
    updated: serverTimestamp(),
  };

  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'services', params.id);
    delete params['id'];
    await updateDoc(docRef, params);
    resolv(true);
  });
};

export const deleteService = (params) => {
  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'services', params.id);
    await deleteDoc(docRef, params);
    resolv(true);
  });
};

