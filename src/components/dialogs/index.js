import { Dialog } from "quasar";
import CustomDialog from "./CustomDialog";

const bridgeTypeAndDialog = (type, bodyComponentName) => {
  Dialog.create({
    title: "Alert Title",
    component: CustomDialog,
    componentProps: {
      type,
      bodyComponentName,
    },
  });
};

export default bridgeTypeAndDialog;
