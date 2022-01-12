import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userInfo",
  state: () => ({
    userInfo:null,
    pageTab:'login',
    tagsArr:[],
    spendList:[]
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  actions: {
    
  },
});
