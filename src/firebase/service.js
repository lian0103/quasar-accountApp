import { collection, getDocs, onSnapshot } from "firebase/firestore";
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
      console.log(arr);
      ServiceStore.setServicelist(arr);
      resolv(true);
    });
  });
};
