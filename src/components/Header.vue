<script setup>
import { useUserStore } from "../stores/userInfo";
import { fiebaseSignOut } from "../firebase/auth";
import { useRouter } from "vue-router";

const $router = useRouter();
const userStore = useUserStore();

const handleSignInOut = () => {
  if (userStore.userInfo) {
    fiebaseSignOut()
      .then((res) => {
        userStore.userInfo = null;
        userStore.pageTab = "login";
        userStore.tagsArr = [];
        userStore.spendList = [];
        localStorage.setItem("userInfo", null);
        $router.push({ path: "/" });
      })
      .catch((err) => {});
  }
  if (!userStore.userInfo) {
    userStore.pageTab = "login";
    $router.push({ path: "/signup" });
  }
};
</script>
<template>
  <q-header class="header" elevated>
    <q-toolbar>
      <q-toolbar-title class="flex">
        <img
          class="rounded-full w-12 h-12 m-2 justify-center"
          src="../assets/favicon-96x96.png.ico"
          alt=""
        />
        <div class="py-4 cursor-pointer" @click="$router.push({ path: '/' })">
          Account
        </div>
      </q-toolbar-title>
      <!-- <q-btn
        class="mx-2"
        :label="userStore.userInfo ? 'SignOut' : 'Login'"
        @click="handleSignInOut"
        color="secondary"
      /> -->

      <q-btn color="secondary" label="Menu">
        <q-menu
          class="bg-white text-purple-600"
          auto-close
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 80px">
            <q-item clickable v-close-popup>
              <q-item-section @click="handleSignInOut">{{
                userStore.userInfo ? "SignOut" : "Login"
              }}</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @click="$router.push({ path: '/edit' })"
                >Edit</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div class="px-2">v0.0.5</div>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
