<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/userInfo";
import { useQuasar } from "quasar";

const userStore = useUserStore();
const $router = useRouter();
const $q = useQuasar();

$router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(userStore.userInfo);
  if (to.fullPath == "/signup" && userStore.userInfo) {
    // console.log($q.platform.is)
    next("/edit");
  } else if (
    !userStore.userInfo &&
    to.fullPath != "/signup" &&
    to.fullPath != "/"
  ) {
    $q.dialog({
      title: `請先登入`,
      message: "",
    }).onOk(() => {
      next("/signup");
    });
  } else {
    next();
  }
});
</script>

<template>
  <router-view />
</template>
