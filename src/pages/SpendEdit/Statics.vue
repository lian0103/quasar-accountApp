<script setup>
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

const seriesPie = [44, 55, 41, 17, 15];

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
</script>

<template>
  <div>
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
  </div>
</template>
