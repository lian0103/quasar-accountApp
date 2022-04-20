<script setup>
import { useRouter } from "vue-router";
import { useUserStore, useStadiumStore } from "./stores/index";
const UserStore = useUserStore();
const StadiumStore = useStadiumStore();
const $router = useRouter();

$router.beforeEach(async (to, from, next) => {
  let { path } = to;

  if (path == "/service") {
    if (UserStore.getUserlist.length == 0) {
      await UserStore.initUserlistListning();
    }
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
