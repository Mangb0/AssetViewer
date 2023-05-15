import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/fbx/:no",
    name: "fbx",
    component: () => import("../views/FbxLoader.vue"),
    props: true,
  },
  {
    path: "/",
    name: "Card",
    component: () => import("../views/FbxCard.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
