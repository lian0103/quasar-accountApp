import { collection, getDocs } from "firebase/firestore";
import { db } from "./index";

export const getUserData = async () => {
//   console.log("in~~~");
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => {
      return {
          ...doc.data(),
          uid:doc.id
      }
  });
};
