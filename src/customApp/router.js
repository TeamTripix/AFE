import asyncComponent from "../helpers/AsyncFunc";

const routes = [
  {
    path: "fee",
    component: asyncComponent(() => import("./containers/index"))
  },
  {
    path: "attendance",
    component: asyncComponent(() => import("./containers/MaterialUiTables/index"))
  }
];
export default routes;
