<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userInfo";
import { useQuasar } from "quasar";

const userStore = useUserStore();
const $router = useRouter();
const $q = useQuasar();

$router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(userStore.userInfo);
  if (to.fullPath == "/signup" && userStore.userInfo) {
    $q.dialog({
      title: `請先登出`,
      message: "登入狀態下無法登入/註冊新帳號",
    }).onOk(() => {});
    next("/edit");
  }

  if (!userStore.userInfo && to.fullPath != "/signup") {
    next("/signup");
  }
  next();
});
</script>

<template>
  <router-view />
</template>
