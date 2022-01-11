import { getDatabase, ref, set } from "firebase/database";
import app from "./index";

const db = getDatabase(app);

export const tagsRef = ref(db, "docs");

export function setTag(tags=[],memberId='123') {
  const timeId = new Date().valueOf();
  set(ref(db, `docs/${memberId}`), {
    tags: tags,
    time: timeId,
  });
}

export default {};
