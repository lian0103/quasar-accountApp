<script setup>
import { useStadiumStore } from "../stores/index";
import { onMounted, ref } from "vue";

const StadiumStore = useStadiumStore();

const loading = ref(false);
const rows = ref([]);

const columns = [
  {
    name: "id",
    label: "場館id",
    align: "left",
    field: (row) => row.id,
  },
  {
    name: "name",
    label: "場館名稱",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "address",
    label: "地址",
    align: "left",
    field: (row) => row.address,
  },
  {
    name: "opneHour",
    label: "開放時間",
    align: "left",
    field: (row) => row.opneHour,
  },
  {
    name: "rooms",
    label: "場地",
    align: "left",
    field: (row) => row.rooms,
    format: (arr) => arr?.join(","),
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
  if (StadiumStore.getStadiumlist.length == 0) {
    loading.value = true;
    StadiumStore.initStadiumlistListning().then((res) => {
      loading.value = false;
    });
  }
});
</script>

<template>
  <q-page>
    <h2 class="font-2xl font-Oswald-500 px-4">服務列表</h2>
    <div class="flex justify-end px-4">
      <q-btn color="primary" size="sm" label="新增服務" @click="handleRowAdd" />
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="StadiumStore.getStadiumlist"
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
  </q-page>
</template>
