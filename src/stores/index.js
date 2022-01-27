import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    leftDrawerOpen: true,
    reportData: JSON.parse(localStorage.getItem("gt_report")) || [],
    departmentInfo: JSON.parse(localStorage.getItem("gt_depInfo")) || {
      title: "資訊開發部疫情戰情回報",
      depName: "資訊開發部",
      date: "",
      peopleNum: "28",
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
      localStorage.setItem("gt_depInfo", JSON.stringify(depInfoData));
    },
  },
});
