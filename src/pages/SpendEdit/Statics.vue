<script setup>
import { ref, watchEffect, reactive } from "vue";
import { useUserStore } from "../../stores/userInfo";
import moment from "moment";

const userStore = useUserStore();
const selectOptions = {
  五天內: moment().subtract("days", 5).format("YYYY-MM-DD"),
  十天內: moment().subtract("days", 10).format("YYYY-MM-DD"),
  三十天內: moment().subtract("days", 30).format("YYYY-MM-DD"),
  全部: "1970-01-01",
};

const curSelect = ref("五天內");
const totalOfSeleted = ref(0);
const total = ref(0);
const deatailstr = ref("");
const spendListLength = ref(0);

const barObj = reactive({
  chartOptionsBar: {},
  seriesBar: [],
  chartOptionsBarTotal: {},
});

watchEffect(() => {
  // console.log("in watchEffect", curSelect.value);
  totalOfSeleted.value = 0;
  deatailstr.value = "";
  spendListLength.value = 0;

  let hasNoTag = false;
  let spendList = userStore.spendList.map((item) => {
    let obj = { ...item };
    if (!userStore.tagsArr.includes(item.tag)) {
      hasNoTag = true;
      obj.tag = "未分類";
    }
    return obj;
  });
  let tagsArr = hasNoTag ? [...userStore.tagsArr, "未分類"] : userStore.tagsArr;

  barObj.chartOptionsBar = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        ...new Set(
          spendList
            .map((item) => item.date)
            .filter((date) =>
              moment(date).isAfter(selectOptions[curSelect.value])
            )
        ),
      ],
    },
  };

  barObj.seriesBar = tagsArr.map((tag) => {
    return {
      name: tag,
      data:
        barObj.chartOptionsBar.xaxis.categories.map((cat) => {
          let val = spendList
            .filter(
              (item) =>
                item.tag == tag &&
                item.date == cat &&
                moment(item.date).isAfter(selectOptions[curSelect.value])
            )
            .map((item) => item.spend)
            ?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
          // console.log(val);
          totalOfSeleted.value += val;
          return val;
        }) || [],
    };
  });

  barObj.chartOptionsBarTotal = {
    chart: {
      height: 350,
      type: "radar",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "11px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "normal",
        colors: [
          function (opts) {
            return "#444";
          },
        ],
      },
    },
    xaxis: {
      categories: tagsArr,
      labels: {
        style: {
          colors: tagsArr.map((i) => "000"),
          fontSize: "14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };

  barObj.seriesBarTotal = [
    {
      name: "總消費",
      data: tagsArr.map((tag) => {
        // console.log(tag);
        let val = spendList
          .filter((item) =>
            moment(item.date).isAfter(selectOptions[curSelect.value])
          )
          .filter((item) => item.tag == tag)
          ?.map((item) => {
            spendListLength.value++;
            return item.spend;
          })
          ?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        // console.log(val);
        deatailstr.value += `${tag}共${val}元;`;
        return val;
      }),
    },
  ];
});
</script>

<template>
  <div>
    <div class="w-full md:w-1/2 px-1 md:mx-auto">
      <div class="flex justify-end">
        <q-select
          class="w-1/3 md:w-1/4"
          v-model="curSelect"
          :options="Object.keys(selectOptions)"
          behavior="menu"
          label="區間"
        />
      </div>
      <h2 class="text-2xl py-2">
        {{ curSelect }}花費累計{{ totalOfSeleted }}元
      </h2>
      <div class="overflow-y-scroll md:overflow-hidden">
        <apexchart
          :width="$q.platform.is.desktop ? '600' : '350'"
          type="bar"
          :options="barObj.chartOptionsBar"
          :series="barObj.seriesBar"
        ></apexchart>
      </div>
    </div>

    <div class="w-full md:w-1/2 md:mx-auto my-4">
      <h2 class="text-2xl py-2">全{{ spendListLength }}筆</h2>
      <p>{{ deatailstr }}</p>
      <div class="overflow-y-scroll md:overflow-hidden">
        <apexchart
          type="radar"
          height="350"
          :options="barObj.chartOptionsBarTotal"
          :series="barObj.seriesBarTotal"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
.vue-apexcharts {
  display: flex;
  justify-content: center;
}
</style>
