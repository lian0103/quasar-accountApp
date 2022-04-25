<script setup>
import {
  useServiceStore,
  useUserStore,
  useStadiumStore,
} from "../stores/index";
import {
  postService,
  updateServiceInfo,
  deleteService,
} from "../firebase/service";
import { onMounted, ref, reactive } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const ServiceStore = useServiceStore();
const UserStore = useUserStore();
const StadiumStore = useStadiumStore();
const loading = ref(false);
const rows = ref([]);
const dialogData = reactive({
  show: false,
  mode: "ADD",
  errMsg: "",
  form: {
    name: "",
    server: "",
    attendent: [],
    stadium: "",
    price: 0,
    desc: "",
  },
});

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
    format: (id) =>
      UserStore.getUserlist.filter((item) => item.uid == id)[0]?.name || id,
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
    format: (stadium) =>
      StadiumStore.getStadiumlist.filter((item) => item.id == stadium)[0]
        ?.name || stadium,
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

const handleRowAdd = () => {
  dialogData.show = true;
  dialogData.mode = "ADD";
};

const handleRowEdit = (row) => {
  // console.log(row);
  dialogData.show = true;
  dialogData.mode = "EDIT";
  dialogData.form = {
    ...row,
    server:
      UserStore.getUserlist.filter((item) => item.uid == row.server)[0]?.name ||
      row.server,
    stadium:
      StadiumStore.getStadiumlist.filter((item) => item.id == row.stadium)[0]
        ?.name || "",
    attendent: row.attendent.map((uid) => {
      let target = UserStore.getUserlist.filter((item) => item.uid == uid)[0];
      return {
        label: target?.name,
        value: uid,
      };
    }),
  };
};

const handleRowDelete = (row) => {
  // console.log(row);
  $q.dialog({
    title: "DELETE",
    message: `刪除服務 ${row.name}?`,
    cancel: true,
  }).onOk(() => {
    deleteService(row);
    dialogData.show = false;
  });
};

const handleAddEditForm = () => {
  let params = {
    ...dialogData.form,
    price: parseInt(dialogData.form.price),
    server: dialogData.form.server || "",
    stadium: dialogData.form.stadium.value || "",
    attendent: dialogData.form.attendent?.map((item) => item.value) || [],
  };
  switch (dialogData.mode) {
    case "ADD": {
      postService(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          name: "",
          server: "",
          attendent: [],
          stadium: "",
          price: 0,
          desc: "",
        };
      });

      break;
    }
    case "EDIT": {
      updateServiceInfo(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          name: "",
          server: "",
          attendent: [],
          stadium: "",
          price: 0,
          desc: "",
        };
      });
      break;
    }
  }
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
  <q-page>
    <h2 class="font-2xl font-Oswald-500 px-4">服務列表</h2>
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
    <q-dialog v-model="dialogData.show">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ dialogData.mode === "ADD" ? "新增服務" : "編輯服務" }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="handleAddEditForm" class="q-gutter-md relative">
            <q-input
              dense
              v-model="dialogData.form.name"
              :label="columns.filter((cItem) => cItem.name == 'name')[0].label"
              :rules="[(val) => !!val || '必填']"
            />

            <q-select
              v-model="dialogData.form.server"
              :options="
                UserStore.getUserlist.map((item) => {
                  return {
                    label: item.name,
                    value: item.uid,
                  };
                })
              "
              behavior="menu"
              :label="
                columns.filter((cItem) => cItem.name == 'server')[0].label
              "
            />

            <q-select
              v-model="dialogData.form.attendent"
              multiple
              :options="
                UserStore.getUserlist.map((item) => {
                  return {
                    label: item.name,
                    value: item.uid,
                  };
                })
              "
              behavior="menu"
              :label="
                columns.filter((cItem) => cItem.name == 'attendent')[0].label
              "
            />

            <q-select
              v-model="dialogData.form.stadium"
              :options="
                StadiumStore.getStadiumlist.map((item) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })
              "
              behavior="menu"
              :label="
                columns.filter((cItem) => cItem.name == 'stadium')[0].label
              "
            />

            <q-input
              dense
              type="number"
              v-model="dialogData.form.price"
              :label="columns.filter((cItem) => cItem.name == 'price')[0].label"
              :rules="[(val) => !!val || '必填']"
            />

            <q-input
              dense
              v-model="dialogData.form.desc"
              :label="columns.filter((cItem) => cItem.name == 'desc')[0].label"
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
  </q-page>
</template>
