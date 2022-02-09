import { defineStore } from "pinia";
import { date } from "quasar";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    leftDrawerOpen: true,
    reportData: JSON.parse(localStorage.getItem("gt_report")) || [],
    departmentInfo: localStorage.getItem("gt_depInfo")
      ? {
          ...JSON.parse(localStorage.getItem("gt_depInfo")),
          date: date.formatDate(new Date(), "MM/DD"),
        }
      : {
          title: "資訊處",
          depName: "資訊處",
          date: date.formatDate(new Date(), "MM/DD"),
        },
  }),
  getters: {
    getReportData(state) {
      // console.log("in~~getReportData");
      return state.reportData;
    },
  },
  actions: {
    addReportData(dataObj) {
      // console.log("in addReportData", dataObj);
      this.reportData = [...this.reportData, dataObj];
      localStorage.setItem("gt_report", JSON.stringify(this.reportData));
    },
    setReportData(reportData) {
      // console.log("in setReportData", reportData);
      this.reportData = [...reportData];
      localStorage.setItem("gt_report", JSON.stringify(reportData));
    },
    setDepInfo(depInfoData) {
      // console.log("in setDepInfo", depInfoData);
      this.departmentInfo = {
        ...depInfoData,
      };

      let obj = { ...depInfoData };
      delete obj.date;
      // console.log(obj);

      localStorage.setItem("gt_depInfo", JSON.stringify(obj));
    },
  },
});
