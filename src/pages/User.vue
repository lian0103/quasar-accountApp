<script setup>
import { useUserStore } from "../stores/index";
import { onMounted, ref } from "vue";

const UserStore = useUserStore();
const loading = ref(false);
const rows = ref([]);

const columns = [
  {
    name: "uid",
    label: "uid",
    align: "left",
    field: (row) => row.uid,
  },
  {
    name: "name",
    label: "姓名",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "email",
    label: "信箱",
    align: "left",
    field: (row) => row.email,
  },
  {
    name: "roles",
    label: "角色id",
    align: "left",
    field: (row) => row.roles,
    format: (arr) => arr.join(","),
  },
  {
    name: "btns",
    label: "操作",
    align: "center",
  },
];

const handleRowAdd = () => {};

const handleRowEdit = (row) => {
  console.log(row);
};

const handleRowDelete = (row) => {
  console.log(row);
};

onMounted(() => {
  if (UserStore.getUserlist.length == 0) {
    loading.value = true;
    UserStore.setUserlist().then((res) => {
      loading.value = false;
    });
  }
});
</script>

<template>
  <div class="p-2">
    <h2 class="font-2xl font-Oswald-500">使用者</h2>
    <div class="flex justify-end px-4">
      <q-btn
        color="primary"
        size="sm"
        label="新增使用者"
        @click="handleRowAdd"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="UserStore.getUserlist"
        :columns="columns"
        row-key="uid"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-btns="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              size="sm"
              label="編輯"
              @click="
                () => {
                  handleRowEdit(props.row);
                }
              "
            />
            <q-btn
              class="ml-2"
              color="negative"
              size="sm"
              label="刪除"
              @click="
                () => {
                  handleRowDelete(props.row);
                }
              "
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>
