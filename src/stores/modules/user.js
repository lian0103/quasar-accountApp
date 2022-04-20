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
    initUserlistListning(){
      return new Promise((resolv,reject)=>{
        getUserData().then(()=>{
          resolv(true);
        })
      })
    },
    setUserlist(data) {
      this.userlist = [...data];
    },
  },
});
