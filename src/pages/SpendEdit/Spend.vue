<script setup>
import { reactive } from "vue";
import { date } from "quasar";
import { useUserStore } from "../../stores/userInfo";
import { pushSpend } from "../../firebase/spend";

const userStore = useUserStore();
const uid = userStore.userInfo.uid;

let table = reactive({
  columns: [
    {
      name: "date",
      field: "date",
      label: "建立時間",
      align: "left",
      sortable: true,
    },
    {
      name: "spend",
      field: "spend",
      label: "花費",
      align: "left",
      sortable: true,
    },
    {
      name: "tag",
      field: "tag",
      label: "標籤",
      align: "left",
      sortable: true,
    },
    {
      name: "memo",
      field: "memo",
      label: "註記",
      align: "left",
    },
  ],
});

const timeStamp = Date.now();
const dateStr = date.formatDate(timeStamp, "YYYY-MM-DD");
const formSpend = reactive({
  date: dateStr,
  spend: 1,
  tag: "",
  memo: "",
});

const handleAddSpend = () => {
  pushSpend({ ...formSpend }, uid);
};

const handleRules = (target) => {
  switch (target) {
    case "spend": {
      return (val) =>
        (!!parseInt(val) > 0 && parseInt(val) < 50000) || "金額大於0 小於5萬";
    }
  }
};
</script>

<template>
  <div class="w-full md:w-1/2 md:mx-auto">
    <h2 class="text-2xl py-2">SPEND</h2>
    <q-form
      @submit="handleAddSpend"
      class="q-gutter-md flex justify-around mx-auto"
    >
      <div class="left w-full">
        <q-input filled v-model="formSpend.date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="formSpend.date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          maxlength="50000"
          prefix="$"
          type="number"
          v-model.number="formSpend.spend"
          label="money"
          clearable
          :rules="[handleRules('spend')]"
        />

        <q-select
          v-model="formSpend.tag"
          :options="userStore.tagsArr"
          behavior="menu"
          label="Tag"
          :rules="[handleRules('tag')]"
        />

        <q-input
          maxlength="20"
          v-model.number="formSpend.memo"
          label="Memo"
          clearable
        />
      </div>

      <div class="right">
        <q-btn
          label="spend"
          icon="fas fa-plus-circle"
          size="md"
          type="submit"
          color="secondary"
          rounded
        />
      </div>
    </q-form>
    <br />
    <q-table
      title="花費列表"
      dense
      :rows="userStore.spendList || []"
      :columns="table.columns"
      row-key="name"
    />
  </div>
</template>
