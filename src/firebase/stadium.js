import { collection, onSnapshot } from "firebase/firestore";
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
      // console.log(arr);
      StadiumStore.setStadiumlist(arr);
      resolv(true);
    });
  });
};
