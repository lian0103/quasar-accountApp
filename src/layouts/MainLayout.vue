<script setup>
import HeaderVue from "../components/Header.vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/index";

const appStore = useAppStore();

const $router = useRouter();
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <HeaderVue />
    <q-drawer
      show-if-above
      v-model="appStore.$state.leftDrawerOpen"
      :width="220"
      side="left"
      bordered
    >
      <q-list style="min-width: 80px">
        <q-item clickable v-close-popup>
          <q-item-section @click="$router.push({ path: '/' })">
            後台狀態</q-item-section
          >
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="$router.push({ path: '/user' })"
            >使用者清單</q-item-section
          >
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
