import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/TestView.vue"),
  },
  {
    path: "/test2",
    name: "test2",
    component: () => import("../views/TestView2.vue"),
  },
  {
    path: "/resize",
    name: "resize",
    component: () => import("../views/TestResize.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
  },
  {
    path: "/fbx/:no",
    name: "fbx",
    component: () => import("../views/FbxLoader.vue"),
    props: true,
  },
  {
    path: "/Card",
    name: "Card",
    component: () => import("../views/FbxCard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
