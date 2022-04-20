<script setup>
import { getUserData } from "../firebase/user";
import { onMounted, ref } from "vue";

const loading = ref(false);
const rows = ref([]);

const columns = [
  {
    name: "uid",
    label: "鍵值",
  },
  {
    name: "name",
    label: "姓名",
  },
  ,
  {
    name: "email",
    label: "信箱",
  },
  {
    name: "roles",
    label: "角色",
  },
];

onMounted(() => {
  loading.value = true;
  getUserData().then((res) => {
    rows.value = [...res];
    console.log(rows.value);
    loading.value = false;
  });
});
</script>

<template>
  <div class="p-2">
    <h2 class="font-2xl font-Oswald-500">使用者</h2>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="uid" :loading="loading">
        <template v-slot:loading>
          <q-inner-loading showing color="primary" /> </template
      ></q-table>
    </div>
  </div>
</template>
