import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AppLogin.vue") },
      { path: "/disciplines", component: () => import("pages/SelectDiscipline.vue") },
      { path: "/expert", component: () => import("pages/SelectDiscipline.vue") },
      { path: '/expert/:discipline', component: () => import('pages/ExpertPage.vue') },
      { path: '/student/discipline/:id', component: () => import('pages/TestCompletePage.vue') },
      {
        path: '/expert/:discipline/rules/:id',
        component: () => import('pages/RulesEdit.vue'),
      },
      {
        path: '/expert/:discipline/test/:id',
        component: () => import('pages/TestEdit.vue'),
      },
      {
        path: '/expert/:discipline/test',
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
