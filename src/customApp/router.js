import asyncComponent from "../helpers/AsyncFunc";

const routes = [
  {
    path: "fee-management",
    component: asyncComponent(() => import("./containers/enhancedTable"))
  },
  {
    path: "attendance-management",
    component: asyncComponent(() => import("./containers/MaterialUiTables/index"))
  }
];
export default routes;
