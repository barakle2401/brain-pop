import Vue from "vue";
import VueRouter from "vue-router";
import HomeV1 from "@/views/HomeV1";
import HomeV2 from "@/views/HomeV2";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homeV1",
    component: HomeV1,
    children: [
      {
        path: "view/:id",
        name: "viewActivityItem",
        component: () => import("@/components/activities/ViewActivityItem"),
      },
    ],
  },
  {
    path: "/v2",
    name: "homeV2",
    component: HomeV2,
    children: [
      {
        path: "view/:id",
        name: "viewActivityItem",
        component: () => import("@/components/activities/ViewActivityItem"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
