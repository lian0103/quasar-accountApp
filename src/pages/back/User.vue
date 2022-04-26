<script setup>
import { useUserStore, useRoleStore } from "../../stores/index";
import { onMounted, ref, reactive } from "vue";
import { createUser } from "../../firebase/auth";
import { useQuasar } from "quasar";
import { setUserInfo, updateUserInfo, deleteUser } from "../../firebase/user";
import { parseFireStoreTimeStamp } from "../../utils";

const $q = useQuasar();
const UserStore = useUserStore();
const RoleStore = useRoleStore();
const loading = ref(false);
const rows = ref([]);
const dialogData = reactive({
  show: false,
  mode: "ADD",
  errMsg: "",
  form: {
    name: "",
    password: "",
    password2: "",
    email: "",
    roles: [],
  },
});
const emailRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const columns = [
  {
    name: "uid",
    label: "使用者id",
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

const handleAddEditForm = () => {
  switch (dialogData.mode) {
    case "ADD": {
      createUser(dialogData.form)
        .then((res) => {
          // console.log('created res', res.uid);
          let params = {
            ...dialogData.form,
            docId: res.uid,
          };
          setUserInfo(params).then((res) => {
            dialogData.show = false;
            dialogData.errMsg = "";
            dialogData.form = {
              name: "",
              password: "",
              password2: "",
              email: "",
              roles: [],
            };
          });
        })
        .catch((err) => {
          // console.log(err.message);
          dialogData.errMsg = err.message;
        });

      break;
    }
    case "EDIT": {
      let params = {
        ...dialogData.form,
        roles: dialogData.form.roles.filter((item) => item),
      };

      updateUserInfo(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          name: "",
          password: "",
          password2: "",
          email: "",
          roles: [],
        };
      });
      break;
    }
  }
};

const handleRowEdit = (row) => {
  // console.log(row);
  dialogData.show = true;
  dialogData.mode = "EDIT";
  dialogData.form = {
    ...row,
  };
};

const handleRowDelete = (row) => {
  // console.log(row);
  $q.dialog({
    title: "DELETE",
    message: `刪除會員${row.name}?`,
    cancel: true,
  }).onOk(() => {
    deleteUser(row);
    dialogData.show = false;
  });
};

onMounted(() => {
  if (UserStore.getUserlist.length == 0) {
    loading.value = true;
    UserStore.initUserlistListning().then((res) => {
      loading.value = false;
    });
  }
});
</script>

<template>
  <q-page>
    <h2 class="font-2xl font-Oswald-500 px-4">使用者</h2>
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
              v-if="!props.row.roles.includes('admin')"
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
              {{ dialogData.mode === "ADD" ? "新增使用者" : "編輯使用者" }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form @submit="handleAddEditForm" class="q-gutter-md relative">
              <q-input
                dense
                v-model="dialogData.form.name"
                :label="
                  columns.filter((cItem) => cItem.name == 'name')[0].label
                "
                :rules="[(val) => !!val || '必填']"
              />

              <q-input
                dense
                v-model="dialogData.form.password"
                label="密碼"
                :rules="[
                  (val) => !!val || '必填',
                  (val) => val.length > 5 || '密碼長度最小為6',
                ]"
              />

              <q-input
                dense
                v-model="dialogData.form.password2"
                label="密碼確認"
                :rules="[
                  (val) => val == dialogData.form.password || '密碼確認錯誤',
                ]"
              />
              <q-input
                dense
                v-model="dialogData.form.email"
                :disable="dialogData.mode == 'EDIT'"
                :label="
                  columns.filter((cItem) => cItem.name == 'email')[0].label
                "
                :rules="[
                  (val) => !!val || '必填',
                  (val) => emailRule.test(val) || 'email格式有誤',
                ]"
              />

              <q-select
                v-model="dialogData.form.roles"
                :options="
                  RoleStore.getRolelist
                    .map((item) => item.id)
                    .filter((id) => id != 'admin')
                "
                multiple
                behavior="menu"
                :label="
                  columns.filter((cItem) => cItem.name == 'roles')[0].label
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
