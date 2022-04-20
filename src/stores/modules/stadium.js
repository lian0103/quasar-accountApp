import { defineStore } from "pinia";
import { getStadiumData } from "../../firebase/stadium";

export const useStadiumStore = defineStore({
  id: "stadium",
  state: () => ({
    stadiumlist: [],
  }),
  getters: {
    getStadiumlist: (state) => state.stadiumlist,
  },
  actions: {
    initStadiumlistListning(){
      return new Promise((resolv,reject)=>{
        getStadiumData().then(()=>{
          resolv(true);
        })
      })
    },
    setStadiumlist(data) {
      this.stadiumlist = [...data];
    },
  },
});
