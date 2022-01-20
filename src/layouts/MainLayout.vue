<script setup>
import HeaderVue from "src/components/Header.vue";
import { useUserStore } from "../stores/userInfo";
import { useRouter } from "vue-router";

const $router = useRouter();
const userStore = useUserStore();

if (userStore.userInfo) {
  userStore.subscribeFirebaseRealtimeDB();
  $router.push({path:'/edit'})
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderVue />

    <q-page-container>
      <q-tabs v-if="userStore.userInfo">
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
