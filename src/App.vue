<script setup>
import { useRouter } from "vue-router";
import {
  useAppStore,
  useUserStore,
  useStadiumStore,
  useRoleStore,
  useServiceStore,
} from "./stores/index";
const AppStore = useAppStore();
const UserStore = useUserStore();
const StadiumStore = useStadiumStore();
const RoleStore = useRoleStore();
const ServiceStore = useServiceStore();
const $router = useRouter();

$router.beforeEach(async (to, from, next) => {
  let { path } = to;

  if (UserStore.getUserlist.length == 0) {
    await UserStore.initUserlistListning();
  }

  if (RoleStore.getRolelist.length == 0) {
    await RoleStore.initRolelistListning();
  }

  if (StadiumStore.getStadiumlist.length == 0) {
    await StadiumStore.initStadiumlistListning();
  }

  if (ServiceStore.getServicelist.length == 0) {
    await ServiceStore.initServicelistListning();
  }

  await AppStore.initValidRoutesListning();

  if (AppStore.getValidedRoutes.includes(path)) {
    next();
  } else {
    next("/");
  }
});
</script>

<template>
  <router-view />
</template>
