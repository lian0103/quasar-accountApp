import { defineStore } from "pinia";
import { getServiceData } from "../../firebase/service";

export const useServiceStore = defineStore({
  id: "service",
  state: () => ({
    servicelist: [],
  }),
  getters: {
    getServicelist: (state) => state.servicelist,
  },
  actions: {
    initServicelistListning(){
      return new Promise((resolv,reject)=>{
        getServiceData().then(()=>{
          resolv(true);
        })
      })
    },
    setServicelist(data) {
      this.servicelist = [...data];
    },
  },
});
