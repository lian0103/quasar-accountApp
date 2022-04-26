import moment from "moment";

export const parseFireStoreTimeStamp = (
  timeObject,
  formatStr = "YYYY-MM-DD , h:mm:ss a"
) => {
  if (!timeObject) return "";

  return (
    moment(new Date(parseInt(timeObject.seconds) * 1000)).format(formatStr) || ""
  );
};
