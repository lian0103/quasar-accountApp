<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userInfo";

const userStore = useUserStore();
const $router = useRouter();

$router.beforeEach((to, from, next) => {
  // console.log(to)
  if (!userStore.userInfo && to.fullPath != '/signup') {
    next("/signup");
  }
  next();
});
</script>

<template>
  <router-view />
</template>
