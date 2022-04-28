import { defineStore } from "pinia";
import {
  defaultValidRoutes,
  permissionItemRouteMap,
} from "../../router/permissionItemMap";
import { useRoleStore } from "./role";
import { useUserStore } from "./user";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    leftDrawerOpen: false,
    curSelectedService: null,
    validedRoutes: localStorage.getItem("bs-validRoutes")
      ? [
          ...JSON.parse(localStorage.getItem("bs-validRoutes")),
          ...defaultValidRoutes,
        ]
      : [...defaultValidRoutes],
  }),
  getters: {
    getValidedRoutes: (state) => state.validedRoutes,
  },
  actions: {
    async initValidRoutesListning() {
      const UserStore = useUserStore();
      const RoleStore = useRoleStore();

      if (UserStore.getUserInfo) {
        let { uid } = UserStore.getUserInfo;
        let userDoc = UserStore.getUserlist.filter(
          (item) => item.uid == uid
        )[0];
        let permissionKeysArr = [];
        userDoc.roles.forEach((roleName) => {
          let arr =
            RoleStore.getRolelist.filter((rItem) => rItem.id == roleName)[0]
              ?.permissions || [];
          permissionKeysArr = [...permissionKeysArr, ...arr];
        });
        this.validedRoutes = [
          ...defaultValidRoutes,
          ...new Set(
            permissionKeysArr.map((key) => permissionItemRouteMap[key])
          ),
        ];
      } else {
        this.validedRoutes = [
          ...defaultValidRoutes.filter((item) => !["/info"].includes(item)),
        ];
      }
    },
  },
});
