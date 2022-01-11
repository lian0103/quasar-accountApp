<script setup>
import { reactive, ref } from "vue";
import { date } from "quasar";

const tab = ref("statics");

const timeStamp = Date.now();
const dateStr = date.formatDate(timeStamp, "YYYY-MM-DD");
const tagsArr = ["aa", "bb", "aa", "bb", "aa", "bb", "aa"];

const chartOptionsBar = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
};

const seriesBar = [
  {
    name: "series-1",
    data: [30, 40, 35, 50, 49, 60, 70, 91],
  },
  {
    name: "series-2",
    data: [23, 14, 13, 15, 14, 16, 17, 19],
  },
];

const chartOptionsPie = {
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      size: 200,
    },
  },
  responsive: [
    {
      options: {
        legend: {
          position: "right",
        },
      },
    },
  ],
};

const seriesPie = [44, 55, 41, 17, 15];

const formTags = reactive({
  add: "",
});

const formSpend = reactive({
  date: dateStr,
  spend: 1,
  tag: tagsArr[0],
  memo: "",
});

const handleRules = (target) => {
  switch (target) {
    case "spend": {
      return (val) =>
        (!!parseInt(val) > 0 && parseInt(val) < 50000) || "金額大於0 小於5萬";
    }
    case "tag": {
      return (val) => !!val || "tag不為空";
    }
    case "tags": {
      return (val) =>
        (!tagsArr.includes(val) && tagsArr.length <= 10) ||
        "tag不重複且最多為10個";
    }
  }
};

const handleClick = (tar) => {
  console.log("click in~!", tar);
};
</script>

<template>
  <div class="flex column justify-start text-center py-4">
    <div class="w-full w-md-1/2">
      <div class="px-4">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="statics" label="Statics" />
          <q-tab name="tag" label="Tag" />
          <q-tab name="spend" label="Spend" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="statics">
            <div class="w-full md:w-1/2 px-1 md:mx-auto">
              <h2 class="text-2xl py-2">近1個月花費累計</h2>
              <div class="overflow-y-scroll md:overflow-hidden">
                <apexchart
                  width="500"
                  type="bar"
                  :options="chartOptionsBar"
                  :series="seriesBar"
                ></apexchart>
              </div>
            </div>

            <div class="w-full md:w-1/3 md:mx-auto">
              <h2 class="text-2xl my-2">今年累計花費比例</h2>
              <div class="overflow-y-scroll md:overflow-hidden">
                <apexchart
                  type="donut"
                  :options="chartOptionsPie"
                  :series="seriesPie"
                ></apexchart>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="tag">
            <div class="w-full md:w-1/2 md:mx-auto">
              <h2 class="text-2xl py-2">TAGS</h2>
              <div class="py-2 text-left">
                <q-chip dense v-for="item in tagsArr">
                  <q-avatar
                    icon="bookmark"
                    color="red"
                    text-color="white"
                    @click="
                      () => {
                        handleClick(item);
                      }
                    "
                  />
                  {{ item }}
                </q-chip>
              </div>

              <q-form
                @submit="handleClick"
                @reset="handleClick"
                class="q-gutter-md flex justify-around mx-auto"
              >
                <div class="left w-full">
                  <q-input
                    maxlength="8"
                    v-model="formTags.add"
                    label="Tags"
                    :rules="[handleRules('tags')]"
                  />
                </div>

                <div class="right">
                  <q-btn
                    label="ADD"
                    icon="fas fa-plus-circle"
                    size="md"
                    type="submit"
                    color="primary"
                    rounded
                  />
                </div>
              </q-form>
            </div>
          </q-tab-panel>
          <q-tab-panel name="spend">
            <div class="w-full md:w-1/2 md:mx-auto">
              <h2 class="text-2xl py-2">SPEND</h2>
              <q-form
                @submit="handleClick"
                @reset="handleClick"
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
                    :options="tagsArr"
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
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <div class="w-full w-md-1/2">
      <div class="px-4"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
