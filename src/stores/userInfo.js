import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userInfo",
  state: () => ({
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
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
