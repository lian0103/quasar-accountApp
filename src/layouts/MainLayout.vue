<script setup>
import HeaderVue from "../components/Header.vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/index";

const appStore = useAppStore();

const $router = useRouter();
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-bg1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.header {
  background-color: $info;
}
</style>
