<script setup>
import { useUserStore } from "../stores/userInfo";
import { date } from "quasar";

const userStore = useUserStore();
const { email, metadata, uid } = userStore.getUserInfo || {};
const { createdAt } = metadata || {};
const dateStr = date.formatDate(parseInt(createdAt), "YYYY-MM-DD");
</script>

<template>
  <q-page class="flex column mx-4">
    <div class="w-full md:w-1/2 md:mx-auto my-4 p-4 infoPage">
      <q-avatar font-size="1.5rem" color="primary" text-color="white">{{
        email[0]
      }}</q-avatar>
      {{ email }}

      <div class="px-1 py-4">Signup At : {{ dateStr }}</div>
      <div class="px-1 py-4">Firebase uid : {{ uid }}</div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
