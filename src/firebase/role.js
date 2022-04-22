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
import { useRoleStore } from 'src/stores';
import { db } from './index';

export const getRoleData = async () => {
  return new Promise((resolv, reject) => {
    const RoleStore = useRoleStore();
    let arr = [];
    onSnapshot(collection(db, 'roles'), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        let data = doc.data();
        return {
          ...data,
          id: doc.id,
        };
      });
      console.log(arr);
      RoleStore.setRolelist(arr);
      resolv(true);
    });
  });
};

export const postRole = (params) => {
  return new Promise(async (resolv, reject) => {
    let data = {
      ...params,
      created: serverTimestamp(),
    };
    delete data['id'];

    await setDoc(doc(db, 'roles', params.id), data);
    resolv(true);
  });
};

export const updateRole = (params) => {
  params = {
    ...params,
    updated: serverTimestamp(),
  };

  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'roles', params.id);
    delete params['id'];
    await updateDoc(docRef, params);
    resolv(true);
  });
};

export const deleteRole = (params) => {
  return new Promise(async (resolv, reject) => {
    const docRef = doc(db, 'roles', params.id);
    await deleteDoc(docRef, params);
    resolv(true);
  });
};
