<script setup>
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/index";

const $router = useRouter();
const appStore = useAppStore();

const toggleLeftDrawer = () => {
  // console.log(appStore.$state.leftDrawerOpen);
  appStore.$state.leftDrawerOpen = !appStore.$state.leftDrawerOpen;
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
        <div class="py-4 cursor-pointer w-40" @click="$router.push({ path: '/' })">
          預約服務
        </div>
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar-title>

      <div class="px-2">v0.0.1</div>
    </q-toolbar>
  </q-header>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
