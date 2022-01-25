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
      <q-toolbar-title class="flex">
        <q-btn dense flat icon="menu" @click="toggleLeftDrawer" />
        <img
          class="rounded-full w-12 h-12 m-2 justify-center"
          src="../assets/quasar-logo-vertical.svg"
          alt=""
        />
        <div class="py-4 cursor-pointer" @click="$router.push({ path: '/' })">
          HeadTitle
        </div>
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
