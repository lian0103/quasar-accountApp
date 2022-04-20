<script setup>
import { useRoleStore } from "../stores/index";
import { onMounted, ref } from "vue";

const RoleStore = useRoleStore();
const loading = ref(false);
const rows = ref([]);
const permissionItemNameMap = {
  userAdd: "使用者新增",
  userDelete: "使用者刪除",
  userEdit: "使用者編輯",
  serviceDelete: "服務刪除",
  serviceAdd: "服務新增",
  serviceEdit: "服務編輯",
};

const columns = [
  {
    name: "name",
    label: "角色id",
    align: "left",
    field: (row) => row.id,
  },
  {
    name: "name",
    label: "角色名稱",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "permissions",
    label: "權限項目",
    align: "left",
    field: (row) =>
      row.permissions
        .map((item) => permissionItemNameMap[item] || item)
        .filter((item) => item),
    format: (arr) => arr?.join(","),
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
  if (RoleStore.getRolelist.length == 0) {
    loading.value = true;
    RoleStore.initRolelistListning().then((res) => {
      loading.value = false;
    });
  }
});
</script>

<template>
  <div class="p-2">
    <h2 class="font-2xl font-Oswald-500">角色列表</h2>
    <div class="flex justify-end px-4">
      <q-btn color="primary" size="sm" label="新增角色" @click="handleRowAdd" />
    </div>
    <div class="q-pa-md">
      <q-table
        :rows="RoleStore.getRolelist"
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
