<script setup>
import { useUserStore } from "../../stores";
import { date } from "quasar";
const userStore = useUserStore();
const { email, metadata, uid, photoURL, displayName } =
  userStore.getUserInfo || {};
const { createdAt } = metadata || {};
const dateStr = date.formatDate(parseInt(createdAt), "YYYY-MM-DD");
</script>

<template>
  <q-page class="flex column mx-4">
    <div class="w-full md:w-1/2 md:mx-auto my-4 p-4 infoPage">
      <q-avatar font-size="2rem" color="primary" text-color="white">
        <img v-if="photoURL" :src="photoURL" alt="photoURL" />
        <span v-else> {{ email ? email[0] : "" }}</span>
      </q-avatar>
      {{ email }}
      <div class="px-1 py-4">{{ displayName }}</div>
      <div class="px-1 py-4">Signup At : {{ dateStr }}</div>
      <div class="px-1 py-4">Firebase uid : {{ uid }}</div>
    </div>
    <section class="w-full md:w-1/2 mx-auto px-6 p-10">
      <h2
        class="text-4xl font-bold text-center text-gray-800 mb-8 font-Oswald-500"
      >
        已預約服務
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos excepturi
        dignissimos atque repudiandae provident, aspernatur doloremque
        perferendis aut est error quod explicabo nisi iste corrupti facilis quae
        et! Delectus, voluptates!
      </p>
    </section>
  </q-page>
</template>

<style scoped lang="scss"></style>
