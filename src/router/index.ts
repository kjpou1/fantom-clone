import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/wallet/:address?",
      name: "wallet",
      component: () => import("../views/WalletView.vue"),
    },
    {
      path: "/",
      name: "staking",
      component: HomeView,
    },
    {
      path: "/",
      name: "fmint",
      component: HomeView,
    },
    {
      path: "/",
      name: "fswap",
      component: HomeView,
    },
    {
      path: "/",
      name: "funi",
      component: HomeView,
    },
    {
      path: "/",
      name: "governance",
      component: HomeView,
    },
    {
      path: "/settings",
      name: "settings",
      // route level code-splitting
      // this generates a separate chunk (Settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SettingsView.vue"),
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
  linkExactActiveClass: "text-wallet_link_active",
});

export default router;
