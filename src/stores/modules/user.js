import { defineStore } from "pinia";
import { getUserData } from "../../firebase/user";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: localStorage.getItem("bs-userInfo")
      ? JSON.parse(localStorage.getItem("bs-userInfo"))
      : null,
    userlist: [],
    pageTab:'login'
  }),
  getters: {
    getUserlist: (state) => state.userlist,
    getUserInfo: (state) => state.userInfo,
  },
  actions: {
    initUserlistListning() {
      return new Promise((resolv, reject) => {
        getUserData().then(() => {
          resolv(true);
        });
      });
    },
    setUserlist(data) {
      this.userlist = [...data];
    },
  },
});
