import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AppLogin.vue") },
      { path: "/test", component: () => import("pages/TestCompletePage.vue") },
      { path: "/expert", component: () => import("pages/ExpertPage.vue") },
      {
        path: '/expert/rules/:id',
        component: () => import('pages/RulesEdit.vue'),
      },
      {
        path: '/expert/test/:id',
        component: () => import('pages/TestEdit.vue'),
      },
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
