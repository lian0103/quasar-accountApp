<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, reactive, ref, computed } from "vue";
import { fakeData } from "./fakeData";

const formShow = ref(false);
const dateRange = ref({ from: "2022/01/26", to: "2022/01/27" });
const curList = reactive(
  fakeData.map((item) => {
    return {
      ...item,
      hover: false,
    };
  })
);
console.log(curList);
const formData = reactive({
  name: "aa",
  breakType: "病假",
  dateRange: computed(() => {
    console.log(dateRange.value);
    let { from = "", to = "" } = dateRange.value;
    return from + " - " + to;
  }),
  symptom: "中樂透",
});

const handleAdd = () => {
  formShow.value = true;
};

const handleRecordSave = () => {
  console.log(formData);
};

const handleRecordDelete = () => {};

const handleRowDelete = (e) => {
  console.log("in handleRowDelete");
};

const handleRules = (target) => {
  switch (target) {
    case "name": {
      return (val) => !!val || "必填";
    }
    case "breakType": {
      return (val) => !!val || "必填";
    }
    case "dateRange": {
      return (val) => {
        let { from, to } = dateRange.value;

        let isSame = from !== to;
        console.log(from, to, isSame);
        return isSame || "起訖時間應為不同";
      };
    }
  }
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".panel").forEach((panel, i) => {
    // console.log(panel);
    ScrollTrigger.create({
      trigger: panel,
      start: "top top",
      pin: true,
      pinSpacing: false,
    });
  });
});
</script>

<template>
  <div class="bg-bg1 mx-auto">
    <div class="panel panel1 flex justify-center">
      <div class="w-full pt-4 text-xl">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center px-4 tracking-wider color-font3">
              資訊處疫情戰情回報
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-8 px-4 mx-auto">
            <div
              class="relative rounded drop-shadow-lg font-mono text-6xl flex justify-center text-white"
            >
              <!-- left side -->
              <div class="border-4 relative bg-black p-8 w-24 h-24 mx-2">
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                  <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                  <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div>

                <!-- time numbers -->
                <span class="absolute inset-0 text-center leading-snug"
                  >01</span
                >
                <span class="absolute right-1 bottom-1 text-lg font-Noto"
                  >月</span
                >

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                  <div class="h-1 w-full bg-gray-800"></div>
                </div>
              </div>

              <!-- right side -->
              <div
                class="clipClock relative border-4 bg-black p-8 w-24 h-24 mx-2"
              >
                <!-- background grid of black squares -->
                <div class="absolute inset-0 grid grid-rows-2">
                  <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                  <div class="bg-gradient-to-br from-gray-700 to-black"></div>
                </div>

                <span class="absolute inset-0 text-center leading-snug"
                  >25</span
                >
                <span class="absolute right-1 bottom-1 text-lg font-Noto"
                  >日</span
                >

                <!-- line across the middle -->
                <div class="absolute inset-0 flex items-center">
                  <div class="h-1 w-full bg-gray-800"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section
      class="panel panel2 w-full mx-auto mt-4 py-6 px-4 bg-overlay rounded-tl-3xl rounded-tr-3xl"
    >
      <div class="row">
        <div class="col-12">
          <h2 class="text-center px-4 tracking-wider text-xl text-primary">
            資訊開發部
          </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="col-12 col-md-8 px-4 mx-auto">
            <div
              class="relative rounded drop-shadow-lg font-mono font-bold text-6xl flex flex-nowrap justify-around text-center"
            >
              <div class="relative p-2 w-24 h-24 mx-2">
                28
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >現有人數</span
                >
              </div>
              <div class="relative p-2 w-24 h-24 mx-2">
                2
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >同仁異常</span
                >
              </div>
              <div class="relative p-2 w-24 h-24 mx-2">
                0
                <span class="absolute bottom-1 left-0 text-sm w-full"
                  >同住家人異常</span
                >
              </div>
            </div>

            <div class="inset-0 flex items-center my-3">
              <div class="h-1 w-full bg-primary"></div>
            </div>

            <div class="relative rounded drop-shadow-lg flex flex-col">
              <h2 class="text-lg text-primary">同仁異常狀況說明</h2>
              <div class="h-64 overflow-y-scrol">
                <div
                  class="mt-1 mb-3 px-0 pt-1 flex flex-col text-black leading-normal bg-white rounded-lg text-base"
                  v-for="(item, index) in curList"
                  @mouseover="item.hover = true"
                  @mouseleave="item.hover = false"
                  :key="index"
                >
                  <div
                    class="flex flex-nowrap relative"
                    @click="
                      (e) => {
                        e.preventDefault();
                        item.relatedListShow = !item.relatedListShow;
                      }
                    "
                  >
                    <span class="px-2"> <i class="fas fa-user" /></span>

                    <div class="pr-6 text-sm">
                      {{ item.description }}
                    </div>

                    <span class="absolute right-1 top-0.5 font-mono">{{
                      item.relatedList.length > 0
                        ? "+" + item.relatedList.length
                        : "+0"
                    }}</span>

                    <span
                      class="block text-md text-gray-300 absolute -right-5 top-0 font-normal"
                    >
                      <i
                        v-show="item.hover"
                        class="fas fa-times"
                        @click.stop="handleRowDelete"
                    /></span>
                  </div>

                  <div
                    v-show="item.relatedListShow"
                    class="flex flex-nowrap bg-bg1 py-2"
                    v-for="(rItem, rIndex) in item.relatedList"
                    :key="'r' + rIndex"
                  >
                    <span class="px-2"> <i class="fas fa-home" /></span>

                    <div class="text-sm">
                      {{ rItem }}
                    </div>
                  </div>
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
                :options="['aa', 'bb', 'cc']"
                behavior="menu"
                label="同仁"
                :rules="[handleRules('name')]"
              />

              <q-select
                v-model="formData.breakType"
                :options="['病假', '事假', '其他']"
                behavior="menu"
                label="請假別"
                :rules="[handleRules('breakType')]"
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
                      <q-date range title="" v-model="dateRange">
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
                label="症狀紀錄"
                clearable
              />
            </div>
            <div class="w-full flex justify-between">
              <q-btn
                color="negative"
                label="Delete"
                @click="handleRecordDelete"
              />
              <q-btn label="Save" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.infoBox {
  max-width: 768px;
}

.clipClock {
  min-width: 80px;
  max-width: 120px;
}

.panel1 {
  height: 200px;
}

.panel2 {
  height: 92vh;
}
</style>
