import { getDatabase, ref, set } from "firebase/database";
import app from "./index";

const db = getDatabase(app);

export const getMemberTagsRef = (uid) => {
  if (!uid) return false;

  return ref(db, `tags/${uid}`);
};

export function setTag(newTags = [], uid) {
  if (!uid) return false;

  const timeId = new Date().valueOf();
  set(ref(db, `tags/${uid}`), {
    data: newTags,
    time: timeId,
  });
}

export default {};
