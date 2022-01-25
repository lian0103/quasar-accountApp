<script setup>
import { useRouter } from "vue-router";
const $router = useRouter();

$router.beforeEach((to, from, next) => {
  next();
});
</script>

<template>
  <router-view />
</template>
