import { createPinia } from "pinia";

const pinia = createPinia();

export default ({ app }) => {
//   console.log("in~?");
  app.use(pinia);
};
