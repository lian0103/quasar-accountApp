<script setup>
import { useServiceStore, useUserStore } from "../stores/index";
import { onMounted, ref } from "vue";

const ServiceStore = useServiceStore();
const UserStore = useUserStore();
const loading = ref(false);
const rows = ref([]);

const columns = [
  {
    name: "id",
    label: "服務id",
    align: "left",
    field: (row) => row.id,
  },
  {
    name: "name",
    label: "服務名稱",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "server",
    label: "提供者",
    align: "left",
    field: (row) => row.server,
    format: (arr) => arr?.join(","),
  },
  {
    name: "attendent",
    label: "參加者",
    align: "left",
    field: (row) => row.attendent,
    format: (arr) => {
      return arr.map((uid) => {
        let name =
          UserStore.getUserlist.filter((item) => item.uid === uid)[0].name ||
          uid;
        return name;
      });
    },
  },
  {
    name: "stadium",
    label: "場館",
    align: "left",
    field: (row) => row.stadium,
    format: (stadium) => stadium,
  },
  {
    name: "price",
    label: "價格",
    align: "left",
    field: (row) => row.price,
  },
  {
    name: "desc",
    label: "描述",
    align: "left",
    field: (row) => row.desc,
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
  if (ServiceStore.getServicelist.length == 0) {
    loading.value = true;
    ServiceStore.initServicelistListning().then((res) => {
      loading.value = false;
    });
  }
});
</script>

<template>
  <div class="p-2">
    <h2 class="font-2xl font-Oswald-500">服務列表</h2>
    <div class="flex justify-end px-4">
      <q-btn color="primary" size="sm" label="新增服務" @click="handleRowAdd" />
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="ServiceStore.getServicelist"
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
