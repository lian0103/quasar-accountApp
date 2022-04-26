<script setup>
import { useRouter } from "vue-router";
import { useAppStore , useUserStore, useStadiumStore, useRoleStore } from "./stores/index";
const AppStore = useAppStore();
const UserStore = useUserStore();
const StadiumStore = useStadiumStore();
const RoleStore = useRoleStore();
const $router = useRouter();

$router.beforeEach(async (to, from, next) => {
  let { path } = to;

  if (UserStore.getUserlist.length == 0) {
    await UserStore.initUserlistListning();
  }

  if (RoleStore.getRolelist.length == 0) {
    await RoleStore.initRolelistListning();
  }

  AppStore.initValidRoutesListning()

  if (path == "/service") {
    if (StadiumStore.getStadiumlist.length == 0) {
      await StadiumStore.initStadiumlistListning();
    }
  }

  next();
});
</script>

<template>
  <router-view />
</template>
