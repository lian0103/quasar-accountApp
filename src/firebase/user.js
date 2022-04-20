import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useUserStore } from "src/stores";
import { db } from "./index";

export const getUserData = async () => {
  return new Promise((resolv, reject) => {
    const UserStore = useUserStore();
    let arr = [];
    onSnapshot(collection(db, "users"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          uid: doc.id,
        };
      });
      console.log(arr);
      UserStore.setUserlist(arr);
      resolv(true);
    });
  });
};
