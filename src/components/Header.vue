<script setup>
import { useRouter } from "vue-router";
import { useAppStore, useUserStore } from "../stores/index";
import { fiebaseSignOut } from "../firebase/auth";

const $router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

const toggleLeftDrawer = () => {
  // console.log(appStore.$state.leftDrawerOpen);
  appStore.$state.leftDrawerOpen = !appStore.$state.leftDrawerOpen;
};

const handleSignInOut = () => {
  if (userStore.getUserInfo) {
    fiebaseSignOut()
      .then((res) => {
        userStore.userInfo = null;
        localStorage.setItem("bs-userInfo", null);
        localStorage.removeItem("bs-validRoutes");
        $router.push({ path: "/" });
      })
      .catch((err) => {});
  }
  if (!userStore.getUserInfo) {
    $router.push({ path: "/signup" });
  }
};
</script>
<template>
  <q-header class="header" elevated>
    <q-toolbar>
      <q-toolbar-title class="flex items-center">
        <img
          class="rounded-full w-8 h-8 m-2 justify-center"
          src="../assets/quasar-logo-vertical.svg"
          alt=""
        />
        <div
          class="py-4 cursor-pointer md:w-40"
          @click="$router.push({ path: '/' })"
        >
          預約服務
        </div>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar-title>

      <q-icon
        name="face"
        class="text-2xl p-2"
        v-if="userStore.getUserInfo"
        @click="
          $router.push({
            path: '/info',
          })
        "
      />

      <q-btn
        color="secondary"
        :label="userStore.getUserInfo ? '登出' : '登入'"
        @click="handleSignInOut"
      />

      <div class="px-2">v0.0.1</div>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
