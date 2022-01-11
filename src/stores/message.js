import { defineStore } from "pinia";

export const useMsgStore = defineStore({
  id: "message",
  state: () => ({
    list: ['aa','bb'],
  }),
  getters: {
    getMsglist: (state) => {
      return state.list;
    },
  },
  actions: {
    add(){
      let arr = [...this.list,'add~'];
      this.list = arr;
      console.log(arr)
    }
  },
});
