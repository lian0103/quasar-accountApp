<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../stores/userInfo";
import { fiebaseSignOut } from "../firebase/auth";
import { useRouter } from "vue-router";

const $router = useRouter();
const userStore = useUserStore();

if (userStore.userInfo) {
  userStore.subscribeFirebaseRealtimeDB();
  $router.push({ path: "/edit" });
}

const quasar = useQuasar();
const isDark = ref(false);
const toggle = () => {
  quasar.dark.toggle();
  isDark.value = quasar.dark.isActive;
};
const handleSignInOut = () => {
  if (userStore.userInfo) {
    fiebaseSignOut()
      .then((res) => {
        userStore.userInfo = null;
        userStore.pageTab = "login";
        userStore.tagsArr = [];
        userStore.spendList = [];
        localStorage.setItem("userInfo", null);
        $router.push({ path: "/signup" });
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
  <q-layout view="lHh Lpr lFf">
    <q-header class="header" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <i class="fas fa-file-invoice-dollar text-2xl"></i>
          SPENDING
        </q-toolbar-title>

        <!-- <q-btn
          round
          size="10px"
          :color="isDark ? 'white' : 'blue-grey-10'"
          :icon="isDark ? 'lightbulb_outline' : 'lightbulb'"
          :style="isDark ? 'color: #ccc !important;' : 'color: #fff;'"
          @click="toggle"
        /> -->
        <q-btn
          class="mx-2"
          :label="userStore.userInfo ? 'SignOut' : 'Login'"
          @click="handleSignInOut"
          color="secondary"
        />
        <div class="px-2">v0.0.4</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-tabs
        v-if="userStore.userInfo"
        :class="isDark ? 'text-white' : 'text-dark'"
      >
        <q-route-tab class="w-1/2" icon="fas fa-dollar-sign" to="/edit" exact />
        <q-route-tab class="w-1/2" icon="fas fa-info-circle" to="/info" exact />
      </q-tabs>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
