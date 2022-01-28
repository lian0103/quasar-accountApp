<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  onMounted,
  reactive,
  ref,
  computed,
  getCurrentInstance,
  onUpdated,
} from "vue";
import { reportData, departmentInfo, depMembers } from "./fakeData";
import { v4 as uuidv4 } from "uuid";
import { date, useQuasar, scroll } from "quasar";
import { useAppStore } from "../stores/index";

const $q = useQuasar();

const instance = getCurrentInstance();

const appStore = useAppStore();
const curDepInfo = computed(() => {
  return { ...appStore.departmentInfo };
});
const curReportList = computed(() => {
  return appStore.reportData.map((item) => item);
});
const countRelatedLength = computed(() => {
  let num = 0;
  curReportList.value.forEach((item) => {
    // console.log(item.relatedList.length);
    num += item.relatedList.length;
  });
  // console.log(num);
  return num;
});

const headTilte = ref(curDepInfo.value.title || "");

const { addToDate } = date;
const formShow = ref(false);
const formShow2 = ref(false);
const formShowDepInfo = ref(false);
const dateRange = ref({
  from: date.formatDate(new Date(), "MM/DD"),
  to: date.formatDate(addToDate(new Date(), { days: 1 }), "MM/DD"),
});

const dateSingle = ref(date.formatDate(new Date(), "MM/DD"));

const formData = reactive({
  name: "",
  breakType: "病假",
  dateRange: computed(() => {
    // console.log(dateRange.value);
    let { from = "", to = "" } = dateRange.value;
    return from + " - " + to;
  }),
  symptom: "",
  textAll: computed(() => {
    let { from = "", to = "" } = dateRange.value;
    let date = from + " - " + to;
    return (
      formData.name +
      " " +
      formData.breakType +
      " " +
      date +
      " " +
      (formData.symptom || "")
    );
  }),
});

const formData2 = reactive({
  curRecordItemUuid: null,
  textAll: "",
});

const formDataDepInfo = reactive({
  ...curDepInfo.value,
  date: computed(() => {
    // console.log(dateSingle.value);
    return dateSingle.value;
  }),
});

const handleDepInfoSave = () => {
  // console.log("formDataDepInfo", formDataDepInfo);
  appStore.setDepInfo(formDataDepInfo);
  formShowDepInfo.value = false;
};

const handleRowAdd = () => {
  formShow.value = true;
};

const handleRecordSave = () => {
  // console.log(curReportList.value);
  appStore.addReportData({
    description: formData.textAll,
    relatedListShow: true,
    relatedList: [],
    uuid: uuidv4(),
  });
  formShow.value = false;
};

const handleRowDelete = (tarItem) => {
  // console.log("in handleRowDelete");
  $q.dialog({
    title: "",
    message: `刪除這筆"${tarItem.description}"?`,
    cancel: true,
  }).onOk(() => {
    let newData = curReportList.value.filter(
      (item) => item.uuid != tarItem.uuid
    );
    appStore.setReportData(newData);
  });
};

const handleRelatedDelete = (tarItem, tar) => {
  // console.log("in handleRelatedDelete");
  $q.dialog({
    title: "",
    message: `刪除這筆"${tar}"?`,
    cancel: true,
  }).onOk(() => {
    let newData = curReportList.value.map((item) => {
      if (item.uuid == tarItem.uuid) {
        if (item.relatedList.indexOf(tar) >= 0) {
          delete item.relatedList[item.relatedList.indexOf(tar)];
          // console.log(item.relatedList);
        }
        return {
          ...item,
          relatedList: item.relatedList.filter((str) => str),
        };
      }
      return item;
    });
    appStore.setReportData(newData);
  });
};

const handleRelatedSave = () => {
  let newData = curReportList.value.map((item) => {
    // console.log("uuid", item.uuid);
    if (item.uuid == formData2.curRecordItemUuid) {
      // console.log("in", item.uuid);
      return {
        ...item,
        relatedList: [...item.relatedList, formData2.textAll],
      };
    }
    return item;
  });

  appStore.setReportData(newData);
  // console.log(appStore.reportData);
  formShow2.value = false;
};

const handleRelatedRowAdd = (item) => {
  formShow2.value = true;
  formData2.curRecordItemUuid = item.uuid;
  // console.log("target", item.uuid);
};

const handleRules = (target) => {
  switch (target) {
    case "need": {
      return (val) => !!val || "必填";
    }
    case "dateRange": {
      return (val) => {
        let { from, to } = dateRange.value;
        let isSame = from !== to;
        // console.log(from, to, isSame);
        return isSame || "起訖時間應為不同";
      };
    }
  }
};

const handleRowShowMore = (tarItem) => {
  tarItem.relatedListShow = !tarItem.relatedListShow;
  appStore.setReportData(curReportList.value);
  instance.proxy.$forceUpdate();
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    // console.log(panel);
    let scrollInstance = ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });

    ScrollTrigger.addEventListener("scrollEnd", (e) => {
      // console.log("in~~~??",ScrollTrigger)
      if (window.scrollY >= 100) {
        // console.log("in~");
        headTilte.value = `2022年${
          curDepInfo.value.date?.split("/")[0] || "/"
        }月${curDepInfo.value.date?.split("/")[1] || "/"}日`;
      } else {
        headTilte.value = curDepInfo.value.title;
      }
    });
  });
});

const handleSelectClose = () => {
  // console.log("in,,,handleSelectClose");
  instance.refs.qDateProxy1.hide();
};

// onUpdated(() => {
//   console.log("instance", instance);
// });
</script>

<template>
  <div class="mx-auto infoBox">
    <div class="panel panel1 flex justify-center">
      <div class="w-full text-xl" @click="formShowDepInfo = true">
        <div class="row">
          <div class="col-12">
            <h2
              class="text-center px-4 tracking-wider color-font3 cursor-pointer py-0 font-bold"
            >
              {{ headTilte }}
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 px-4 mx-auto">
            <div
              class="relative drop-shadow-lg font-mono text-6xl flex justify-center text-black"
            >
              <!-- left side -->
              <div class="relative bg-white rounded-lg p-0 w-24 h-24 mx-2">
                <!-- background grid of black squares -->
                <!-- <div class="absolute inset-0 grid grid-rows-2">
                  <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                  <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div> -->

                <!-- time numbers -->
                <span class="absolute inset-0 text-center leading-snug pt-1">{{
                  curDepInfo.date.split("/")[0] || "/"
                }}</span>
                <span class="absolute right-1 bottom-1 text-lg font-Noto"
                  >月</span
                >

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                  <div class="h-1 w-full bg-gray-200"></div>
                </div>
              </div>

              <!-- right side -->
              <div class="relative bg-white rounded-lg p-8 w-24 h-24 mx-2">
                <!-- background grid of black squares -->
                <!-- <div class="absolute inset-0 grid grid-rows-2">
                  <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                  <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div> -->

                <span class="absolute inset-0 text-center leading-snug pt-1">{{
                  curDepInfo.date.split("/")[1] || "/"
                }}</span>
                <span class="absolute right-1 bottom-1 text-lg font-Noto"
                  >日</span
                >

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                  <div class="h-1 w-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section
      class="panel panel2 w-full mx-auto mt-4 pb-6 px-4 bg-overlay rounded-tl-3xl rounded-tr-3xl"
    >
      <div class="row">
        <div class="col-12">
          <h2
            class="text-center px-4 tracking-wider text-xl text-primary pt-5 pb-4"
          >
            {{ curDepInfo.depName }}
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="col-12 col-md-8 px-4 mx-auto">
            <div
              class="relative rounded drop-shadow-lg font-mono font-bold text-6xl flex flex-nowrap justify-around text-center text-primary"
            >
              <div class="relative p-2 w-24 h-24 mx-2">
                {{ depMembers.length }}
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >現有人數</span
                >
              </div>
              <div class="relative p-2 w-24 h-24 mx-2">
                {{ curReportList.length }}
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >同仁異常</span
                >
              </div>
              <div class="relative p-2 w-24 h-24 mx-2">
                {{ countRelatedLength }}
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >同住家人異常</span
                >
              </div>
            </div>

            <div class="inset-0 flex items-center py-5">
              <div class="h-1 w-full bg-primary"></div>
            </div>

            <div class="relative rounded drop-shadow-lg flex flex-col">
              <h2 class="text-base text-primary">同仁異常狀況說明</h2>
              <div class="h-80 overflow-y-scroll">
                <div
                  style="width: 90%"
                  class="my-2 px-0 pt-1 flex flex-col text-black leading-normal text-sm"
                  v-for="item in curReportList"
                  :key="item.uuid"
                >
                  <div
                    class="flex flex-nowrap relative bg-white py-0.5 rounded-lg"
                    @click.prevent="
                      () => {
                        handleRowShowMore(item);
                      }
                    "
                  >
                    <span class="px-3"> <i class="fas fa-user" /></span>

                    <div class="pr-6 text-sm">
                      {{ item.description }}
                    </div>

                    <span class="absolute right-3 top-0.5 font-mono">{{
                      item.relatedList.length > 0
                        ? "+" + item.relatedList.length
                        : "+0"
                    }}</span>

                    <span
                      v-if="item.relatedListShow"
                      class="block text-md text-gray-300 absolute -right-5 top-0.5 font-normal"
                    >
                      <i
                        class="fas fa-times"
                        @click.stop="
                          () => {
                            handleRowDelete(item);
                          }
                        "
                    /></span>
                  </div>

                  <div
                    v-if="item.relatedListShow"
                    class="flex flex-nowrap bg-bg1 mt-2 py-0.5 rounded-lg"
                    v-for="rItem in item.relatedList"
                    :key="'r' + item.uuid"
                    @click="
                      () => {
                        handleRelatedDelete(item, rItem);
                      }
                    "
                  >
                    <span class="px-2"> <i class="fas fa-home" /></span>

                    <div class="text-sm">
                      {{ rItem }}
                    </div>
                  </div>
                  <div
                    class="flex flex-nowrap bg-bg1 mt-2 py-0.5 rounded-lg"
                    v-if="item.relatedListShow"
                  >
                    <p
                      class="px-2 cursor-pointer text-primary"
                      @click="
                        () => {
                          handleRelatedRowAdd(item);
                        }
                      "
                    >
                      <i class="fas fa-plus"></i> 新增同住家人
                    </p>
                  </div>
                </div>
                <div
                  class="mt-4 px-0 pt-1 flex flex-col leading-normal text-primary rounded-lg text-base"
                >
                  <p class="px-2 cursor-pointer" @click="handleRowAdd">
                    <i class="fas fa-plus"></i> 新增同仁
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <q-dialog v-model="formShow">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">同仁狀況新增</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="handleRecordSave"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full">
              <q-select
                v-model="formData.name"
                :options="depMembers"
                behavior="menu"
                label="同仁"
                :rules="[handleRules('need')]"
              />

              <q-select
                v-model="formData.breakType"
                :options="['病假', '事假', '其他']"
                behavior="menu"
                label="請假別"
                :rules="[handleRules('need')]"
              />

              <q-input
                filled
                v-model="formData.dateRange"
                :rules="[handleRules('dateRange')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        minimal
                        range
                        title=""
                        v-model="dateRange"
                        mask="MM/DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                maxlength="20"
                v-model.number="formData.symptom"
                label="症狀"
                clearable
              />
              <q-input
                maxlength="20"
                v-model.number="formData.textAll"
                label="說明:[同仁][請假別][日期][症狀]"
                disable
              />
            </div>
            <div class="w-full flex justify-center">
              <q-btn label="儲存" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="formShow2">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">同仁同住家人狀況新增</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="handleRelatedSave"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full">
              <q-input
                maxlength="30"
                v-model.number="formData2.textAll"
                :rules="[handleRules('need')]"
                label="說明"
              />
            </div>
            <div class="w-full flex justify-center">
              <q-btn label="儲存" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="formShowDepInfo">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">回報資訊設定</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="handleDepInfoSave"
            class="q-gutter-md flex justify-around mx-auto"
          >
            <div class="left w-full">
              <q-input
                filled
                v-model="formDataDepInfo.date"
                :rules="[handleRules('need')]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy1"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        minimal
                        v-model="dateSingle"
                        mask="MM/DD"
                        @click="handleSelectClose"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                maxlength="20"
                v-model="formDataDepInfo.title"
                label="回報標題"
                :rules="[handleRules('need')]"
                clearable
              />
              <q-input
                maxlength="20"
                v-model="formDataDepInfo.depName"
                label="單位"
                :rules="[handleRules('need')]"
                clearable
              />
            </div>
            <div class="w-full flex justify-center">
              <q-btn label="儲存" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.infoBox {
  max-width: 414px;
}

.panel1 {
  height: 196px;
}

.panel2 {
  height: 92vh;
  position: relative;
  top: -16px;
}
</style>
