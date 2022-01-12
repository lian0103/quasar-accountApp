import { getDatabase, ref, set, push  } from "firebase/database";
import app from "./index";

const db = getDatabase(app);

export const getMemberSpendRef = (uid) => {
  if (!uid) return false;

  return ref(db, `spend/${uid}`);
};

export function pushSpend(obj = {}, uid) {
  if (!uid) return false;

  const newPostRef = push(ref(db, `spend/${uid}`));
  const timeId = new Date().valueOf();
  set(newPostRef, {
    ...obj,
    time: timeId,
  });
}

export default {};
