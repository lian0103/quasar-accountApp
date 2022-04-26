<script setup>
import { useStadiumStore } from "../stores/index";
import { onMounted, ref, reactive } from "vue";
import {
  postStadium,
  updateStadiumInfo,
  deleteStadium,
} from "../firebase/stadium";
import { useQuasar } from "quasar";
import { parseFireStoreTimeStamp } from "../utils";

const $q = useQuasar();
const StadiumStore = useStadiumStore();
const loading = ref(false);
const rows = ref([]);

const dialogData = reactive({
  show: false,
  mode: "ADD",
  errMsg: "",
  form: {
    name: "",
    address: "",
    opneHour: "",
    rooms: "",
    desc: "",
  },
});

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
  },
  {
    name: "desc",
    label: "描述",
    align: "left",
    field: (row) => row.desc,
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
    align: "center",
  },
];

const handleRowAdd = () => {
  dialogData.show = true;
  dialogData.mode = "ADD";
};

const handleRowEdit = (row) => {
  dialogData.show = true;
  dialogData.mode = "EDIT";
  dialogData.form = {
    ...row,
  };
};

const handleRowDelete = (row) => {
  $q.dialog({
    title: "DELETE",
    message: `刪除場地 ${row.name}?`,
    cancel: true,
  }).onOk(() => {
    deleteStadium(row);
    dialogData.show = false;
  });
};

const handleAddEditForm = () => {
  let params = {
    ...dialogData.form,
  };
  switch (dialogData.mode) {
    case "ADD": {
      postStadium(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          name: "",
          address: "",
          opneHour: "",
          rooms: "",
          desc: "",
        };
      });

      break;
    }
    case "EDIT": {
      updateStadiumInfo(params).then((res) => {
        dialogData.show = false;
        dialogData.errMsg = "";
        dialogData.form = {
          name: "",
          address: "",
          opneHour: "",
          rooms: "",
          desc: "",
        };
      });
      break;
    }
  }
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
    <h2 class="font-2xl font-Oswald-500 px-4">場地列表</h2>
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
      <q-dialog v-model="dialogData.show">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ dialogData.mode === "ADD" ? "新增場地" : "編輯場地" }}
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
                v-model="dialogData.form.address"
                :label="
                  columns.filter((cItem) => cItem.name == 'address')[0].label
                "
              />

              <q-input
                dense
                v-model="dialogData.form.opneHour"
                :label="
                  columns.filter((cItem) => cItem.name == 'opneHour')[0].label
                "
              />

              <q-input
                dense
                v-model="dialogData.form.rooms"
                :label="
                  columns.filter((cItem) => cItem.name == 'rooms')[0].label
                "
              />

              <q-input
                dense
                v-model="dialogData.form.desc"
                :label="
                  columns.filter((cItem) => cItem.name == 'desc')[0].label
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
