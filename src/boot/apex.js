import VueApexCharts from "vue3-apexcharts";
import ApexCharts from 'apexcharts';

export default ({ app }) => {
  // console.log("in~ apexchart");
  app.use(VueApexCharts);
  app.config.globalProperties.$apexcharts = ApexCharts;
};
