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
    path: "/signin",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("components/SignIn.vue") }],
  },

  {
    path: "/myCities",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/CityList.vue") },
    ],
  },

  {
    path: "/newCity",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("components/NewCity.vue") }],
  },

  {
    path: "/updateCity",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/UpdateCity.vue") },
    ],
  },

  {
    path: "/citySearch",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("components/CitySearch.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
