const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LandingPage.vue"),
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "signup", component: () => import("src/pages/Signup.vue") },
      { path: "info", component: () => import("src/pages/Info.vue") },
      { path: "edit", component: () => import("pages/SpendEdit/index.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
