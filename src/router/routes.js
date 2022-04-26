const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/front/LandingPage.vue") },
      { path: "signup", component: () => import("src/pages/front/Signup.vue") },
      { path: "info", component: () => import("src/pages/front/Info.vue") },
      { path: "dashbord", component: () => import("src/pages/back/Dashbord.vue") },
      { path: "user", component: () => import("src/pages/back/User.vue") },
      { path: "role", component: () => import("src/pages/back/Role.vue") },
      { path: "service", component: () => import("src/pages/back/Service.vue") },
      { path: "stadium", component: () => import("src/pages/back/Stadium.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
