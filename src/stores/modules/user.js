import { defineStore } from "pinia";
import { getUserData } from "../../firebase/user";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userlist: [],
  }),
  getters: {
    getUserlist: (state) => state.userlist,
  },
  actions: {
    setUserlist() {
      return new Promise((resolv, reject) => {
        getUserData()
          .then((res) => {
            console.log(res);
            this.userlist = res;
            resolv(true);
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
  },
});
