import { defineStore } from "pinia";
import { getRoleData } from "../../firebase/role";

export const useRoleStore = defineStore({
  id: "role",
  state: () => ({
    rolelist: [],
  }),
  getters: {
    getRolelist: (state) => state.rolelist,
  },
  actions: {
    initRolelistListning(){
      return new Promise((resolv,reject)=>{
        getRoleData().then(()=>{
          resolv(true);
        })
      })
    },
    setRolelist(data) {
      this.rolelist = [...data];
    },
  },
});
