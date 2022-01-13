import { getDatabase, ref, set, push, remove } from "firebase/database";
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
    tag:!!obj.tag?obj.tag:"無tag"
  });
}

export function removeSpend(uid, key) {
  if (!uid || !key) return false;

  remove(ref(db, `spend/${uid}/${key}`));
}

export default {};
