<script setup>
import { useRoleStore } from "../../stores/index";
import { postRole, updateRole, deleteRole } from "../../firebase/role";
import { onMounted, ref, reactive } from "vue";
import { useQuasar } from "quasar";
import { parseFireStoreTimeStamp } from "../../utils";
import { permissionItemNameMap } from '../../router/permissionItemMap'


const $q = useQuasar();
const RoleStore = useRoleStore();
const loading = ref(false);
const rows = ref([]);
const dialogData = reactive({
  show: false,
  mode: "ADD",
  errMsg: "",
  form: {
    id: "",
    name: "",
    permissions: [],
  },
});

const columns = [
  {
    name: "id",
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
        ?.map((item) => permissionItemNameMap[item] || item)
        .filter((item) => item) || [],
    format: (arr) => arr?.join(","),
  },
  {
    name: "time",
    label: "新增/更新時間",
    align: "left",
    field: (row) => parseFireStoreTimeStamp(row.updated || row.created),
  },
  {
    name: "btns",
    label: "操作",
    align: "left",
  },
];

const handleRowAdd = () => {
  dialogData.show = true;
  dialogData.mode = "ADD";
};

const handleRowEdit = (row) => {
  console.log(row);
  dialogData.show = true;
  dialogData.mode = "EDIT";
  dialogData.form = {
    ...row,
    permissions: row.permissions?.map((item) => {
      return (
        {
          label: permissionItemNameMap[item],
          value: item,
        } || []
      );
    }),
  };
};

const handleRowDelete = (row) => {
  $q.dialog({
    title: "DELETE",
    message: `刪除角色 ${row.name}?`,
    cancel: true,
  }).onOk(() => {
    deleteRole(row);
    dialogData.show = false;
  });
};

const handleAddEditForm = () => {
  let params = {
    ...dialogData.form,
    permissions: dialogData.form.permissions.map((item) => item.value),
  };

  switch (dialogData.mode) {
    case "ADD": {
      postRole(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          id: "",
          name: "",
          permissions: [],
        };
      });

      break;
    }
    case "EDIT": {
      updateRole(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          id: "",
          name: "",
          permissions: [],
        };
      });
      break;
    }
  }
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
  <q-page>
    <h2 class="font-2xl font-Oswald-500 px-4">角色列表</h2>
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
              v-if="props.row.id != 'admin'"
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
      <q-dialog v-model="dialogData.show">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ dialogData.mode === "ADD" ? "新增角色" : "編輯角色" }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form @submit="handleAddEditForm" class="q-gutter-md relative">
              <q-input
                dense
                :disable="dialogData.mode == 'EDIT'"
                v-model="dialogData.form.id"
                :label="columns.filter((cItem) => cItem.name == 'id')[0].label"
                :rules="[
                  (val) => !!val || '必填',
                  (val) =>
                    !RoleStore.getRolelist
                      .map((item) => item.id)
                      .includes(val) || '角色id重複',
                ]"
              />
              <q-input
                dense
                :disable="dialogData.mode == 'EDIT'"
                v-model="dialogData.form.name"
                :label="
                  columns.filter((cItem) => cItem.name == 'name')[0].label
                "
                :rules="[
                  (val) => !!val || '必填',
                  (val) =>
                    !RoleStore.getRolelist
                      .map((item) => item.name)
                      .includes(val) || '角色名稱重複',
                ]"
              />

              <q-select
                v-model="dialogData.form.permissions"
                :options="
                  Object.keys(permissionItemNameMap).map((key) => {
                    return {
                      label: permissionItemNameMap[key],
                      value: key,
                    };
                  })
                "
                multiple
                behavior="menu"
                :label="
                  columns.filter((cItem) => cItem.name == 'permissions')[0]
                    .label
                "
              />
              <p
                v-if="dialogData.errMsg"
                class="text-red-600 absolute left-0 bottom-0"
              >
                {{ dialogData.errMsg }}
              </p>
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="取消" v-close-popup />
                <q-btn flat label="確定" type="submit" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
