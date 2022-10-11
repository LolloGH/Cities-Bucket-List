const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("components/SignUp.vue") }],
  },

  {
    path: "/myCities",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/CityList.vue") },
    ],
  },

  {
    path: "/signin",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("components/SignIn.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
