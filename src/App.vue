<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/index";
const UserStore = useUserStore();
const $router = useRouter();

$router.beforeEach(async (to, from, next) => {
  let { path } = to;

  if (path == "/service") {
    if (UserStore.getUserlist.length == 0) {
      await UserStore.initUserlistListning();
      next();
    }
  }

  next();
});
</script>

<template>
  <router-view />
</template>
