<script setup>
import HeaderVue from "../components/Header.vue";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/index";
import {
  permissionItemMap,
  menuRouteNameMap,
} from "../router/permissionItemMap";

const appStore = useAppStore();

const $router = useRouter();

console.log(' $router', $router.currentRoute.value.path)

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
        <q-item
          v-for="path in appStore.getValidedRoutes.filter((item) =>
            menuRouteNameMap[item] ? true : false
          )"
          :key="path"
          clickable
          v-close-popup
        >
          <q-item-section :class="path==$router.currentRoute.value.path ? 'text-indigo-700 font-bold':''" @click="$router.push({ path: path })">
            {{ menuRouteNameMap[path] }}</q-item-section
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
  background-color: $positive;
}
</style>
