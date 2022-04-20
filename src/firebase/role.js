import { collection, onSnapshot } from "firebase/firestore";
import { useRoleStore } from "src/stores";
import { db } from "./index";

export const getRoleData = async () => {
  return new Promise((resolv, reject) => {
    const RoleStore = useRoleStore();
    let arr = [];
    onSnapshot(collection(db, "roles"), (snapshot) => {
      arr = snapshot.docs.map((doc) => {
        let data = doc.data();
        return {
          ...data,
          permissions: Object.keys(data).map((key) => {
            if (data[key] && key != "name") {
              return key;
            }
          }),
          id: doc.id,
        };
      });
      console.log(arr);
      RoleStore.setRolelist(arr);
      resolv(true);
    });
  });
};
