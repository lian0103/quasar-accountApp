<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/userInfo";
import moment from "moment";

const userStore = useUserStore();
const last5DaysStr = moment().subtract("days", 5).format("YYYY-MM-DD");

const total5Days = ref(0);
const total = ref(0);
const totalStr = ref("");

let spendList = userStore.spendList;
let tagsArr = userStore.tagsArr;

const categories = [
  ...new Set(
    spendList
      .map((item) => item.date)
      .filter((date) => moment(date).isAfter(last5DaysStr))
  ),
];

let hasNoTag = false;
spendList = spendList.map((item) => {
  let obj = { ...item };
  if (!tagsArr.includes(item.tag)) {
    hasNoTag = true;
    obj.tag = "未分類";
  }
  return obj;
});
tagsArr = hasNoTag ? [...tagsArr, "未分類"] : tagsArr;

const chartOptionsBar = {
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
    categories: categories,
  },
};

const seriesBar = tagsArr.map((tag) => {
  return {
    name: tag,
    data: categories.map((cat) => {
      let val = spendList
        .filter(
          (item) =>
            item.tag == tag &&
            item.date == cat &&
            moment(item.date).isAfter(last5DaysStr)
        )
        .map((item) => item.spend)
        ?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      // console.log(val);
      total5Days.value += val;
      return val;
    }),
  };
});

const seriesPie = tagsArr.map((tag) => {
  return spendList
    .filter((item) => item.tag == tag)
    .map((item) => item.spend)
    .reduce((a, b) => a + b, 0);
});

const chartOptionsPie = {
  chart: {
    type: "donut",
  },
  labels: tagsArr,
  plotOptions: {
    pie: {
      dataLabels: {
        offset: 0,
      },
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 320,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const chartOptionsBarTotal = {
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
    enabled: false,
  },
  xaxis: {
    categories: tagsArr,
  },
};

const seriesBarTotal = [
  {
    name: "總消費",
    data: tagsArr.map((tag) => {
      // console.log(tag);
      let val = spendList
        .filter((item) => item.tag == tag)
        ?.map((item) => item.spend)
        ?.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      // console.log(val);
      total.value += val;
      totalStr.value += `${tag}共${val}元;`;
      return val;
    }),
  },
];
</script>

<template>
  <div>
    <div class="w-full md:w-1/2 px-1 md:mx-auto">
      <h2 class="text-2xl py-2">近5日 花費累計{{ total5Days }}元</h2>
      <div class="overflow-y-scroll md:overflow-hidden">
        <apexchart
          :width="$q.platform.is.desktop ? '600' : '350'"
          type="bar"
          :options="chartOptionsBar"
          :series="seriesBar"
        ></apexchart>
      </div>
    </div>

    <div class="w-full md:w-1/2 md:mx-auto my-4">
      <h2 class="text-2xl py-2">全{{spendList.length}}筆 總消費{{ total }}元</h2>
      <p>{{ totalStr }}</p>
      <div class="overflow-y-scroll md:overflow-hidden">
        <apexchart
          type="radar"
          height="350"
          :options="chartOptionsBarTotal"
          :series="seriesBarTotal"
        ></apexchart>
      </div>
    </div>

    <div class="w-full md:w-1/3 md:mx-auto">
      <h2 class="text-2xl my-4">累計花費比例</h2>
      <div class="overflow-y-scroll md:overflow-hidden">
        <apexchart
          type="donut"
          :options="chartOptionsPie"
          :series="seriesPie"
        ></apexchart>
      </div>
    </div>
  </div>
</template>

<style>
.vue-apexcharts{
  display: flex;
  justify-content: center;
}
</style>
