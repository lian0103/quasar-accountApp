import { defineStore } from "pinia";
import { getMemberTagsRef } from "../firebase/tags";
import { getMemberSpendRef } from "../firebase/spend";
import { onValue } from "firebase/database";

export const useUserStore = defineStore({
  id: "userInfo",
  state: () => ({
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    pageTab: "login",
    tagsArr: [],
    spendList: [],
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  actions: {
    subscribeFirebaseRealtimeDB(uid = null) {
      uid = uid ? uid : this.userInfo.uid;
      console.log(uid);

      const firebaseTagsRef = getMemberTagsRef(uid);
      onValue(firebaseTagsRef, (snapshot) => {
        const data = snapshot.val();
        this.tagsArr = data?.data || [];
      });

      const firebaseSpendRef = getMemberSpendRef(uid);

      onValue(firebaseSpendRef, (snapshot) => {
        const data = snapshot.val() || {};
        let arr = Object.keys(data).map((key) => {
          return { ...data[key], rowKey: key };
        });
        // console.log(arr);
        this.spendList = [...arr].reverse() || [];
      });
    },
  },
});
